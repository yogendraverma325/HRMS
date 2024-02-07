import { Request } from 'express';
import ApiKey from '../database/model/ApiKey.js';
import ApiKeyInterface from '~/interfaces/Key.js';
import User from '../database/model/User.js';
import KeystoreInterface from '~/interfaces/Keystore.ts';

declare interface PublicRequest extends Request {
  apiKey: ApiKeyInterface;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: UserInterface;
  accessToken: string;
  keystore: KeystoreInterface;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
