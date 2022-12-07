import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../../user/role.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { RequiredRole } from './required-role.decorator';

export const UserRoute = () =>
    applyDecorators(
        UseGuards(JwtAuthGuard, RoleGuard),
        ApiBearerAuth(),
        RequiredRole(Role.USER)
    );
