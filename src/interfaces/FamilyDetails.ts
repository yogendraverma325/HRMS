export default  interface EmployeeFamilyDetailsInterface {
    empFamilyDetailsId?: number;
    EmployeeId: number;
    name: string;
    dob: string;
    gender: string;
    emergencyContactPerson: boolean;
    mobileNo: string;
    relationWithEmp: string;
    createdBy?: number;
    createdAt?: Date;
    updatedBy?: number;
    updatedAt?: Date;
  }