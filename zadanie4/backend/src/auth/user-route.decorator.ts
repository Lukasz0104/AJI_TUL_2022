import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../user/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequiredRole } from './required-role.decorator';
import { RoleGuard } from './role.guard';

export const UserRoute = () =>
    applyDecorators(
        UseGuards(JwtAuthGuard, RoleGuard),
        ApiBearerAuth(),
        RequiredRole(Role.USER)
    );
