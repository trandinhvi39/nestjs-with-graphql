import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => req.args[2].req.user);
