import { ApiProperty } from '@nestjs/swagger';

export class EmployeeSignupRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  companyId: string;
}

export class EmployeeSignupResponse {
  @ApiProperty()
  success: boolean;
}

export class EmployeeConfirmOtpRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  code: string;
}

export class EmployeeConfirmOtpResponse {
  @ApiProperty()
  success: boolean;
}
