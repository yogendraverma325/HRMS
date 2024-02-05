
import ApiKeyInterface from '~/interfaces/Key.js';
import { db } from '../../loaders/prisma.js'; 
async function findByKey(key: string |null): Promise<ApiKeyInterface | null> {
  return await db.key.findFirst({
    where:{
      keys: key ? { equals: key } : undefined,
      status: true
    }
  });
}
export default {
  findByKey,
};
