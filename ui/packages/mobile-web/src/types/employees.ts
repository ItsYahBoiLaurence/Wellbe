import { Company } from './companies';
import { Department } from './departments';

export type Employee = {
  id: string;
  cognitoSub: string;
  firstName?: string;
  lastName?: string;
  employeeId?: string;
  department?: Department;
  company: Company;
  contactNumber?: string;
};
