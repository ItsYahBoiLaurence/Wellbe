import { ApiProperty } from '@nestjs/swagger';
import { PagedList } from '@x/common';
import { Type } from 'class-transformer';
import { PortalUser, PortalUserEntity } from './portal-user.schema';

export class PortalUsersList implements PagedList<PortalUser> {
  @ApiProperty({ type: PortalUserEntity, isArray: true })
  @Type(() => PortalUserEntity)
  items: PortalUser[];

  @ApiProperty()
  total: number;
}
