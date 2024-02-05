import _ from 'lodash';
import User from '../../database/model/User.js';
import UserInterface from "../../interfaces/User.js";
export const enum AccessMode {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

export async function getUserData(user: UserInterface) {
  const data = _.pick(user, ['id', 'name','email','firstName','lastName']);
  return data;
}
