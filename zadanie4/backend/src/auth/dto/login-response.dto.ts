import { Role } from '../../user/role.enum';

export class LoginResponse {
    token: string;
    role: Role;
}
