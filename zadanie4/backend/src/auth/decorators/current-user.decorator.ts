import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserStrippedPassword } from '../auth.service';

type RequestWithUser = Request & { user: UserStrippedPassword };

export const CurrentUser = createParamDecorator<UserStrippedPassword>(
    (_data: unknown, ctx: ExecutionContext) => {
        const req: RequestWithUser = ctx.switchToHttp().getRequest();
        return req.user;
    }
);
