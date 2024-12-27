import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController, EntityMetadata, ErrorInfo, Public } from '@x/common';
import {
  EmployeeConfirmOtpRequest,
  EmployeeConfirmOtpResponse,
  EmployeeSignupRequest,
  EmployeeSignupResponse,
} from './auth.entity';
import { AuthService } from './auth.service';
import { AuthenticationGuard, CognitoUser } from '@nestjs-cognito/auth';
import { Employee, EmployeeEntity } from '../employees';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('employee/signup')
  @ApiResponse({ type: EmployeeSignupResponse, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 400 })
  @ApiOperation({ operationId: 'employee-signup' })
  async employeeSignup(
    @Body() req: EmployeeSignupRequest
  ): Promise<EntityMetadata<EmployeeSignupResponse>> {
    const result = await this.authService.employeeSignup(req);
    return BaseController.handleResponse(result);
  }

  @Public()
  @Post('employee/resend-otp')
  @ApiResponse({ type: EmployeeSignupResponse, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 400 })
  @ApiOperation({ operationId: 'employee-resend-otp' })
  async employeeResendOtp(
    @Body() req: EmployeeSignupRequest
  ): Promise<EntityMetadata<EmployeeSignupResponse>> {
    const result = await this.authService.resendOtp(req);
    return BaseController.handleResponse(result);
  }

  @Public()
  @Post('employee/confirm-signup')
  @ApiResponse({ type: EmployeeConfirmOtpResponse, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 400 })
  @ApiOperation({ operationId: 'employee-confirm-signup' })
  async employeeConfirmSignup(
    @Body() req: EmployeeConfirmOtpRequest
  ): Promise<EntityMetadata<EmployeeConfirmOtpResponse>> {
    const result = await this.authService.confirmEmployee(req);
    return BaseController.handleResponse(result);
  }

  @UseGuards(AuthenticationGuard)
  @Get('employee/me')
  @ApiResponse({ type: EmployeeEntity, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 400 })
  @ApiOperation({ operationId: 'employee-get-current-logged-in' })
  async getCurrentLoggedInEmployee(
    @CognitoUser('username') id: string
  ): Promise<EntityMetadata<Employee>> {
    const result = await this.authService.getEmployeeByCognitoId(id);
    return BaseController.handleResponse(result);
  }
}
