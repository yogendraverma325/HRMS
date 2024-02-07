import UserInterface from "../../interfaces/User.js";
import KeystoreInterface from "../../interfaces/Keystore.js";
import { db } from '../../loaders/prisma.js';
async function findforKey(client: UserInterface, key: string): Promise<KeystoreInterface | null> {
  return db.keyStore.findFirst({
    where:{
      client: client.id,
      primaryKey: key
    }
   
  });
}
async function remove(input: KeystoreInterface): Promise<KeystoreInterface | null> {
  return await db.keyStore.delete({
    where: {
      id: input.id
    }
  });
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
  create,
};
