import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (req.headers && req.headers.authorization) {
      req.user = this.parseJwt(req.headers.authorization.replace('Bearer ', ''));
    }
    return super.canActivate(new ExecutionContextHost([req]));
  }

  parseJwt(token): string | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      if (typeof atob === 'undefined') {
        global.atob = function (b64Encoded) {
          return new Buffer(b64Encoded, 'base64').toString('binary');
        };
      }
      return JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
        ),
      );
    } catch {
      return null;
    }
  }
}
