import { Request } from 'express';
import ApiKey from '../database/model/ApiKey.js';
import ApiKeyInterface from '~/interfaces/Key.js';
import Keystore from '../database/model/KeyStore.js';
import User from '../database/model/User.js';

declare interface PublicRequest extends Request {
  apiKey: ApiKeyInterface;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
