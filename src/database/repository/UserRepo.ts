
import EmployeeFamilyDetailsInterface from '~/interfaces/FamilyDetails.js';
import { InternalError } from '../../core/ApiError.js';
import UserInterface from "../../interfaces/User.js";
import { db } from '../../loaders/prisma.js';
// contains critical information of the user
async function findById(id:number): Promise<UserInterface | null> {
  const User = await db. employee.findFirst({
    where:{
      id: id 
    },
    include: {
      Employee_role_details: {
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
  const User = await db. employee.findFirst({
    where:{
      email: email 
    },
    include: {
      Employee_role_details: {
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

async function findPrivateProfileById(id: number): Promise<UserInterface | null> {
  const User = await db. employee.findFirst({
    where:{
      id: id 
    },
    include: {
      Employee_role_details: {
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
async function updatefamilyDetails(user: UserInterface,inputFamilyDetails:EmployeeFamilyDetailsInterface): Promise<EmployeeFamilyDetailsInterface | null> {
  
  const FamilyDetails = await db.employeeFamilyDetails.findFirst({
    where:{
      EmployeeId:user.id
    }
  });
  if(FamilyDetails){
       await db.employeeFamilyDetails.update({
      where: {
        empFamilyDetailsId:FamilyDetails.empFamilyDetailsId,
        EmployeeId:FamilyDetails.EmployeeId
      },
      data: inputFamilyDetails
    })
  }else{
    await db.employeeFamilyDetails.create({
      data: {...inputFamilyDetails,...{EmployeeId:user.id},...{createdBy:user.id},...{updatedBy:user.id}},
    });
  }
  return inputFamilyDetails;
}
export default {
  findById,
  findByEmail,
  findPrivateProfileById,
  updatefamilyDetails
};
