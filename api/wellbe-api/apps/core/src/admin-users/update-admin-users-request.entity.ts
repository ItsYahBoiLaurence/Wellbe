import { PartialType } from '@nestjs/mapped-types';
import { AdminUserEntity } from './admin-user.schema';

export class UpdateAdminUserRequest extends PartialType(AdminUserEntity) {}
