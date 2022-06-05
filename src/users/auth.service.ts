import { PrismaService } from './../prisma.service';
import { LoginDto } from './dto/login.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';

const jwtSecret = process.env.JWT_SECRET || 'secret2022d';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenException();
    }

    return {
      token: this.generateJwt(user),
      username: user.username,
    };
  }

  generateJwt(user: User) {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtSecret,
    );
  }
}
