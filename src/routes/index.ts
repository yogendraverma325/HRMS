import express from 'express';
import apiKey from '../auth/apiKey.js';
import { Permission } from '../database/model/ApiKey.js';

import permission from '../helpers/permission.js';
import authRoutes from './auth/auth.js';
import credential from './auth/credential.js';
import token from './auth/token.js';
import verifyRoutes from './auth/verify.js';
import issue from './issue/index.js';
import profile from './profile/index.js';
import { default as project } from './project/index.js';
import users from './users/index.js';

const router = express.Router();

/*---------------------------------------------------------*/
router.use(apiKey);
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/
router.use('/auth', authRoutes);
router.use('/verify', verifyRoutes);
router.use('/token', token);
router.use('/credential', credential);
router.use('/profile', profile);
router.use('/project', project);
router.use('/issue', issue);
router.use('/users', users);

export default router;
