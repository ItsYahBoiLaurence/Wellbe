import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterEmployeeDto } from './dto/auth.registerEmployee.dto';
import { LoginEmployeeDTO } from './dto/auth.loginEmployee.dto';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('register/employee')
  registerEmployee(@Body() registerEmployeeDto: RegisterEmployeeDto) {
    return this.authService.registerEmployee(registerEmployeeDto);
  }

  @Post('login/employee')
  loginEmployee(@Body() loginEmployeeDTO: LoginEmployeeDTO) {
    return this.authService.loginEmployee(loginEmployeeDTO);
  }
  @Get('fetch/employee')
  fetchEmployee(@Query('email') email: string) {
    return this.authService.fetchEmployee(email);
  }
}
