import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterEmployeeDto } from './dto/auth.registerEmployee.dto';
import { Employee } from './schema/auth.schema';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { LoginEmployeeDTO } from './dto/auth.loginEmployee.dto';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @InjectConnection() private readonly connection: Connection,
    private readonly otpService: OtpService,
  ) {}

  async registerEmployee(_registerEmployeeDto: RegisterEmployeeDto) {
    if ((await this.findByEmail(_registerEmployeeDto.email)) !== null) {
      return new HttpException('Email is Existing', HttpStatus.NOT_FOUND);
    } else {
      const employee = new this.employeeModel(_registerEmployeeDto);

      const answersColection =
        await this.connection.collection('engine-answers');
      await answersColection.insertOne({
        email: _registerEmployeeDto.email,
        answers: {},
        submitCount: 0,
        submitLog: [],
        tipLog: [],
        weeklyLog: {
          P: [],
          W: [],
          SLS: [],
          SFM: [],
        },
      });

      return await employee.save();
    }
  }

  async loginEmployee(_loginEmployeeDTO: LoginEmployeeDTO) {
    const employee = await this.findByEmail(_loginEmployeeDTO.email);
    if (employee) {
      const otpGenerated = await this.otpService.generateOtp();
      const otpSave = await this.otpService.storeOtp(
        _loginEmployeeDTO.email,
        otpGenerated,
      );
      if (otpSave) {
        return new HttpException('OTP Generated thru email', HttpStatus.OK);

        //Send Email and JWT create
      }
    } else {
      return new HttpException('Email is not registered', HttpStatus.NOT_FOUND);
    }
  }

  async fetchEmployee(email: string): Promise<object> {
    if (await this.findByEmail(email)) {
      return await this.employeeModel.findOne({ email });
    } else {
      return new HttpException('Employee is not found', HttpStatus.NOT_FOUND);
    }
  }

  //DB Query

  async findByEmail(email: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ email }).exec();
  }
}
