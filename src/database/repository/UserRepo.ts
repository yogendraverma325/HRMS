
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
      EmployeeId:user.id,
      empFamilyDetailsId:inputFamilyDetails.empFamilyDetailsId
    }
  });
  if(FamilyDetails){
       await db.employeeFamilyDetails.update({
      where: {
        empFamilyDetailsId:inputFamilyDetails.empFamilyDetailsId,
        EmployeeId:user.id
      },
      data: inputFamilyDetails
    })
  }else{
    return await insertMember(user,inputFamilyDetails);
  }
  return inputFamilyDetails;
}
async function addfamilyDetails(user: UserInterface,inputFamilyDetails:EmployeeFamilyDetailsInterface): Promise<EmployeeFamilyDetailsInterface | null> {
 return await insertMember(user,inputFamilyDetails);
}

async function insertMember(user: UserInterface,inputFamilyDetails:EmployeeFamilyDetailsInterface){
  delete inputFamilyDetails.empFamilyDetailsId;
  await db.employeeFamilyDetails.create({
    data: {...inputFamilyDetails,...{EmployeeId:user.id},...{createdBy:user.id},...{updatedBy:user.id}},
  });
  return inputFamilyDetails;
}
async function getfamilyDetails(user: UserInterface): Promise<EmployeeFamilyDetailsInterface[] | null> {
  
return await db.employeeFamilyDetails.findMany({
    where:{
      EmployeeId:user.id
    },
    select:{
      empFamilyDetailsId: true,
      EmployeeId: true,
      name: true,
      dob: true,
      gender: true,
      emergencyContactPerson: true,
      mobileNo: true,
      relationWithEmp: true
    }
  });
}

async function removefamilyDetails(user: UserInterface,memberId:number){
  let isMemberExist=await db.employeeFamilyDetails.findFirst({
    where:{
      EmployeeId:user.id,
       empFamilyDetailsId:memberId
    },
   
  });
  if(isMemberExist){
    return  await db.employeeFamilyDetails.delete({
      where: {
         EmployeeId:user.id,
         empFamilyDetailsId:memberId
         },
    });
  }
  }
export default {
  findById,
  findByEmail,
  findPrivateProfileById,
  updatefamilyDetails,
  getfamilyDetails,
  addfamilyDetails,
  removefamilyDetails
};
