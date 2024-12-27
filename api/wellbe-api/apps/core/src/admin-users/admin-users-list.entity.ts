import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { AdminUser, AdminUserEntity } from './admin-user.schema';

export class AdminUsersList implements PagedList<AdminUser> {
  @ApiProperty({ type: AdminUserEntity, isArray: true })
  @Type(() => AdminUserEntity)
  items: AdminUser[];

  @ApiProperty()
  total: number;
}
