import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, PrismaService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
