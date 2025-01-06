import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Load environment variables from the .env file
    ConfigModule.forRoot(),

    // Configure Mongoose globally
    MongooseModule.forRoot(process.env.MONGODB_URI), // MongoDB URI
  ],
  exports: [MongooseModule], // Export MongooseModule so it can be used in other modules
})
export class DatabaseModule {}
