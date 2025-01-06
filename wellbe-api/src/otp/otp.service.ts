import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { CacheService } from 'src/cache/cache.service'; // You can use a cache service like Redis for temporary storage.

@Injectable()
export class OtpService {
  constructor(private readonly cacheService: CacheService) {}

  // Method to generate a random OTP (6-digit)
  async generateOtp(): Promise<string> {
    const otp = await crypto.randomInt(100000, 999999).toString();
    return otp;
  }

  // Method to store OTP in cache with a short expiration time (e.g., 5 minutes)
  async storeOtp(email: string, otp: string): Promise<boolean> {
    await this.cacheService.set(email, otp, 300); // Store OTP for 5 minutes
    return true;
  }

  // Method to validate OTP (check if the user input matches the stored OTP)
  async validateOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this.cacheService.get(email);

    if (!storedOtp) {
      throw new NotFoundException('OTP expired or not found');
    }

    if (storedOtp !== otp) {
      throw new NotFoundException('Invalid OTP');
    }

    return true;
  }
}
