import { ProtectedRequest, PublicRequest } from 'app.request.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createTokens } from '../../auth/authUtils.js';
import authentication from '../../auth/authentication.js';
import { AuthFailureError, BadRequestError } from '../../core/ApiError.js';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse.js';
import { RoleCode } from '../../database/model/Role.js';
import User from '../../database/model/User.js';
import { VerificationTokenModel } from '../../database/model/VerificationToken.js';
import { default as KeyStoreRepo } from '../../database/repository/KeyStoreRepo.js';
import UserRepo from '../../database/repository/UserRepo.js';
import VerificationTokenRepo from '../../database/repository/VerificationTokenRepo.js';
import asyncHandler from '../../helpers/asyncHandler.js';
import { sendPasswordResetEmail } from '../../helpers/mail.js';
import validator, { ValidationSource } from '../../helpers/validator.js';
import schema from './schema.js';
import { getUserData } from './utils.js';

const router = express.Router();

router.post(
  '/login',
  validator(schema.credential, ValidationSource.BODY),
  asyncHandler(async (req: PublicRequest, res) => {
    const passwordHash = await bcrypt.hash("test1234", 10);
    //console.log(passwordHash)
    const user = await UserRepo.findByEmail(req.body.email);

    if (!user) throw new BadRequestError('User not registered');
    if (!user.password) throw new BadRequestError('Credential not set');

    

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeyStoreRepo.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    const userData = await getUserData(user);
    new SuccessResponse('Login Success', {
      emp: userData,
      tokens: tokens,
    }).send(res);
  }),
);



/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.delete(
  '/logout',
  asyncHandler(async (req: ProtectedRequest, res) => {
    await KeyStoreRepo.remove(req.keystore);
    new SuccessMsgResponse('Logout success').send(res);
  }),
);

export default router;
