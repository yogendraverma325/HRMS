import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse.js';
import UserRepo from '../../database/repository/UserRepo.js';

import { ProtectedRequest } from 'app.request.js';
import _ from 'lodash';
import authentication from '../../auth/authentication.js';
import { BadRequestError } from '../../core/ApiError.js';
import asyncHandler from '../../helpers/asyncHandler.js';
import validator from '../../helpers/validator.js';
import schema from './schema.js';

const router = express.Router();
/*-------------------------------------------------------------------------*/
 router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/my',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findPrivateProfileById((req.user.id));
    if (!user) throw new BadRequestError('User not registered');
    return new SuccessResponse(
      'success',
      _.pick(user, ['name', 'email','firstName','lastName']),
    ).send(res);
  }),
);

router.put(
  '/',
  validator(schema.profile),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findPrivateProfileById(req.user.id);
    if (!user) throw new BadRequestError('User not registered');

    if (req.body.name) user.name = req.body.name;

    await UserRepo.updateInfo(user);

    const data = _.pick(user, ['name', 'profilePicUrl']);

    return new SuccessResponse('Profile updated', data).send(res);
  }),
);

export default router;
