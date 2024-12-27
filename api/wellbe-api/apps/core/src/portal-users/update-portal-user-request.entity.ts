import { PartialType } from '@nestjs/mapped-types';
import { PortalUserEntity } from './portal-user.schema';

export class UpdatePortalUserRequest extends PartialType(PortalUserEntity) {}
