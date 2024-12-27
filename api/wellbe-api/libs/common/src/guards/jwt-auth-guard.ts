import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  DECORATOR_METADATA,
  ForbiddenError,
  UnauthorizedError,
  AuthTokenPayload,
} from '@x/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  validators: GuardValidator[] = [];

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {
    super(reflector);
    this.initValidators();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    this.setUserToRequestByToken(request);

    /* Run through each validators to confirm if request is valid
     * When a validator is not present, return result of previous validator
     * (defaults to false so that it will call `authGuardCanValidate(...)`) */
    return (
      this.validators.reduce((result: boolean, validator) => {
        const metadataValue = this.reflector.get(
          validator.metadataName,
          context.getHandler()
        );
        // if no decorator metadata found, return previous result of validator
        if (!metadataValue) return result;

        /* run validator.isValid() to check if request passes the validation
         * else return previous result */
        return validator.isValid(metadataValue, request) || result;
      }, true) || this.authGuardCanActivate(context)
    );
  }

  authGuardCanActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  setUserToRequestByToken(request: Request) {
    const token = this.getAuthTokenFromHeaders(request);
    if (token) {
      request['user'] = this.jwtService.decode(token);
    }
  }

  private initValidators() {
    this.validators = [
      // check if route is public
      {
        metadataName: DECORATOR_METADATA.public,
        isValid: () => true,
      },
      // check roles of authenticated user if allowed to access
      {
        metadataName: DECORATOR_METADATA.roles,
        isValid: (metadataValue, request) => {
          if (!request?.['user']) {
            throw new UnauthorizedError().exception;
          }
          const user = request['user'] as AuthTokenPayload;
          const rolesRequired = metadataValue as string[];
          const hasRole = user.roles?.some((role) =>
            rolesRequired.includes(role)
          );
          if (!hasRole) {
            throw new ForbiddenError().exception;
          }
          return true;
        },
      },
    ];
  }

  private getAuthTokenFromHeaders(request: Request): string {
    if (!request?.headers?.authorization) return null;
    const { authorization } = request.headers;
    if (!/Bearer [A-Za-z0-9\-\._~\+\/]+=*/.test(authorization)) {
      return null;
    }
    return authorization.replace('Bearer ', '');
  }
}

interface GuardValidator {
  metadataName: string;
  isValid: (metadataValue: any, request: Request) => boolean;
}
