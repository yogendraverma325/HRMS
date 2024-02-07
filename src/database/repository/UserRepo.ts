
import { InternalError } from '../../core/ApiError.js';
import UserInterface from "../../interfaces/User.js";
import { db } from '../../loaders/prisma.js';
// contains critical information of the user
async function findById(id:number): Promise<UserInterface | null> {
  const User = await db.user.findFirst({
    where:{
      id: id 
    },
    include: {
      user_role_details: {
        select: {
          role: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }
      
    }
  });
  return User;
}

async function findByEmail(email: string): Promise<UserInterface | null> {

  
  const User = await db.user.findFirst({
    where:{
      email: email 
    },
    include: {
      user_role_details: {
        select: {
          role: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }
      
    }
  });
  return User;
}

export default {
  findById,
  findByEmail
};
