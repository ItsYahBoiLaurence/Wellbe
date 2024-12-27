import {
  AdminGetUserCommandOutput,
  CognitoIdentityProvider,
} from '@aws-sdk/client-cognito-identity-provider';
import { InjectCognitoIdentityProvider } from '@nestjs-cognito/core';
import { Inject, Injectable } from '@nestjs/common';
import {
  AlreadyExistsError,
  EntityMetadata,
  ErrorInfo,
  InvalidCredentialsError,
  NotFoundError,
  UnhandledError,
} from '@x/common';
import { LoggerService } from '@x/logging';
import { CompaniesRepository } from '../companies';
import { CognitoOptions } from '../config-options';
import { Employee, EmployeesRepository } from '../employees';
import {
  EmployeeConfirmOtpRequest,
  EmployeeConfirmOtpResponse,
  EmployeeSignupRequest,
  EmployeeSignupResponse,
} from './auth.entity';
import { AUTH_SERVICE_OPTIONS } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectCognitoIdentityProvider()
    private cognitoClient: CognitoIdentityProvider,
    private loggerService: LoggerService,
    private employeesRepository: EmployeesRepository,
    private companiesRepository: CompaniesRepository,
    @Inject(AUTH_SERVICE_OPTIONS) private options: CognitoOptions
  ) {}

  async employeeSignup(
    req: EmployeeSignupRequest
  ): Promise<EntityMetadata<EmployeeSignupResponse>> {
    try {
      const user = await this.getUserFromCognito(req.email);
      if (!!user) {
        this.loggerService.error(
          `AuthService.employeeSignup | user with email ${req.email} already exists in cognito`
        );
        return new AlreadyExistsError('User already exists');
      }

      const createUserResult = await this.createEmployee(
        req.email,
        req.password,
        req.companyId
      );
      if (!createUserResult) throw new Error('Failed to create user');

      const otpResult = await this.cognitoClient.resendConfirmationCode({
        ClientId: this.options.clientId,
        Username: createUserResult,
      });
      if (!otpResult) {
        this.loggerService.error(
          `AuthService.login | user with sub ${createUserResult} failed to send confirmation code`
        );
        throw new Error('Failed to send confirmation code');
      }

      return new EntityMetadata({ success: true });
    } catch (error) {
      if (error.type) return new EntityMetadata(null, error as ErrorInfo);
      this.loggerService.error(`AuthService.login | Unexpected error`, error);
      return new UnhandledError(error.message);
    }
  }

  async confirmEmployee(
    req: EmployeeConfirmOtpRequest
  ): Promise<EntityMetadata<EmployeeConfirmOtpResponse>> {
    try {
      const employee = await this.employeesRepository.findOne({
        email: req.email,
      });
      if (!employee) {
        this.loggerService.error(
          `AuthService.confirmEmployee | employee with email ${req.email} not found`
        );
        return new NotFoundError('Employee not found');
      }

      const confirmResult = await this.cognitoClient.confirmSignUp({
        ClientId: this.options.clientId,
        Username: employee.cognitoSub,
        ConfirmationCode: req.code,
      });
      if (!confirmResult) {
        this.loggerService.error(
          `AuthService.confirmEmployee | user with email ${req.email} failed to confirm in cognito`
        );
        return new InvalidCredentialsError();
      }

      return new EntityMetadata({ success: true });
    } catch (error) {
      this.loggerService.error(
        `AuthService.confirmEmployee | Unexpected error`,
        error
      );
      return new UnhandledError(error.message);
    }
  }

  async resendOtp(
    req: EmployeeSignupRequest
  ): Promise<EntityMetadata<EmployeeSignupResponse>> {
    try {
      const cognitoUser = await this.getUserFromCognito(req.email);
      if (!cognitoUser) throw new Error('User not found');
      const otpResult = await this.cognitoClient.resendConfirmationCode({
        ClientId: this.options.clientId,
        Username: req.email,
      });
      if (!otpResult) {
        this.loggerService.error(
          `AuthService.login | user with sub ${cognitoUser.Username} failed to send confirmation code`
        );
        return new InvalidCredentialsError();
      }
    } catch (error) {
      this.loggerService.error(
        `AuthService.resendOtp | Unexpected error`,
        error
      );
      return new InvalidCredentialsError(error.message);
    }
  }

  async getEmployeeByCognitoId(
    cognitoSub: string
  ): Promise<EntityMetadata<Employee>> {
    try {
      const result = await this.employeesRepository.findOne({ cognitoSub });
      if (!result) {
        this.loggerService.error(
          `AuthService.getEmployeeByCognitoId | employee with cognitoSub ${cognitoSub} not found`
        );
        return new NotFoundError('Employee not found');
      }
      return new EntityMetadata(result);
    } catch (error) {
      this.loggerService.error(
        `AuthService.getEmployeeByCognitoId | Unexpected error`,
        error
      );
      return new UnhandledError(error.message);
    }
  }

  private async getUserFromCognito(
    email: string
  ): Promise<AdminGetUserCommandOutput> {
    try {
      const user = await this.cognitoClient.adminGetUser({
        UserPoolId: this.options.userPoolId,
        Username: email,
      });
      if (!user) {
        this.loggerService.error(
          `AuthService.getUserFromCognito | user with email ${email} not found in cognito`
        );
        throw new UnhandledError('User not found');
      }
      return user;
    } catch (error) {
      this.loggerService.error(
        `AuthService.getUserFromCognito | user with email ${email} failed to fetch from cognito`
      );
      return null;
    }
  }

  private async createEmployee(
    email: string,
    password: string,
    companyName: string
  ): Promise<string> {
    const company = await this.companiesRepository.findOne({
      uniqueName: companyName,
    });
    if (!company) {
      this.loggerService.error(
        `AuthService.createUserInCognito | company with uniqueName ${companyName} not found`
      );
      throw new UnhandledError('Company not found');
    }

    const userPassword =
      password ?? `WB${Math.random().toString(36).substring(7)}1!`;
    const cognitoResult = await this.cognitoClient.signUp({
      ClientId: this.options.clientId,
      Username: email,
      Password: userPassword,
    });
    if (!cognitoResult?.UserSub) {
      this.loggerService.error(
        `AuthService.createUserInCognito | user with email ${email} failed to create in cognito`
      );
      throw new UnhandledError('Failed to create user in cognito');
    }

    const addToGroupResult = await this.cognitoClient.adminAddUserToGroup({
      UserPoolId: this.options.userPoolId,
      Username: cognitoResult.UserSub,
      GroupName: 'employees',
    });
    if (!addToGroupResult) {
      this.loggerService.error(
        `AuthService.createUserInCognito | user with sub ${cognitoResult.UserSub} failed to add to group`
      );
      throw new UnhandledError('Failed to add user to group');
    }

    const employee = await this.employeesRepository.create({
      cognitoSub: cognitoResult.UserSub,
      company: company.id,
      email,
      status: 'active',
    } as unknown as Employee);

    if (!employee) {
      this.loggerService.error(
        `AuthService.createUserInCognito | employee with cognitoSub ${cognitoResult.UserSub} failed to create as employee`
      );
      throw new UnhandledError('Failed to create employee');
    }

    return cognitoResult.UserSub;
  }
}
