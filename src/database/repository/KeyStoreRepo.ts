import { Types } from 'mongoose';
import Keystore, { KeystoreModel } from '../model/KeyStore.js';
import User from '../model/User.js';
import UserInterface from "../../interfaces/User.js";
import KeystoreInterface from "../../interfaces/Keystore.js";
import { db } from '../../loaders/prisma.js';
async function findforKey(client: User, key: string): Promise<Keystore | null> {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: key,
    status: true,
  })
    .lean()
    .exec();
}

async function remove(id: Types.ObjectId): Promise<Keystore | null> {
  return KeystoreModel.findByIdAndRemove(id).lean().exec();
}

async function removeAllForClient(client: User) {
  return KeystoreModel.deleteMany({ client: client }).exec();
}

async function find(
  client: User,
  primaryKey: string,
  secondaryKey: string,
): Promise<Keystore | null> {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
  })
    .lean()
    .exec();
}

async function create(
  client: UserInterface,
  primaryKey: string,
  secondaryKey: string,
): Promise<KeystoreInterface | null> {
  const now = new Date();

  const keystore = await db.keyStore.create({
    data: {
      client: client.id,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    },
  });
  return keystore;
}

export default {
  findforKey,
  remove,
  removeAllForClient,
  find,
  create,
};
