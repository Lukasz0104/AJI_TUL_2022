import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/role.enum';

export const RequiredRole = (role: Role) => SetMetadata('required-role', role);
