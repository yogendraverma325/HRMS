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
  '/familyDetails',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findPrivateProfileById((req.user.id));
    if (!user) throw new BadRequestError('User not registered');
   let familyDetails= await UserRepo.getfamilyDetails(user);
    return new SuccessResponse('Profile updated',familyDetails).send(res);
  }),
);


router.put(
  '/familyDetails',
  validator(schema.familyDetails),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findPrivateProfileById(req.user.id);
    if (!user) throw new BadRequestError('User not registered');
    await UserRepo.updatefamilyDetails(user,req.body);
    return new SuccessResponse('Profile updated', req.body).send(res);
  }),
);

export default router;
