import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator.js';

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  profile: Joi.object().keys({
    name: Joi.string().max(100).required(),
    dob: Joi.string().max(100).required(),
    gender: Joi.string().max(100).required(),
  }),
  familyDetails: Joi.object().keys({
    empFamilyDetailsId: Joi.number().required(),
    name: Joi.string().max(100).required(),
    dob: Joi.string().max(100).required(),
    gender: Joi.string().max(100).required(),
    emergencyContactPerson: Joi.boolean().required(),
    mobileNo: Joi.string().max(10).required(),
    relationWithEmp: Joi.string().max(100).required(),
  }),
};
