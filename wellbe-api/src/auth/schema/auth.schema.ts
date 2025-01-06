import { Schema, Document, model } from 'mongoose';

export interface Employee extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyAssigned: string;
  profileImage: string;
}
export const EmployeeSchema = new Schema<Employee>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyAssigned: { type: String, required: true },
  profileImage: { type: String, required: false }, // Optional field, assuming it's not required in the DTO
});

export const EmployeeModel = model<Employee>('Employee', EmployeeSchema);
