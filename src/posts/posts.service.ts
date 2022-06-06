import { PrismaService } from 'src/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data: createPostDto }).catch((err) => {
      throw new BadRequestException('Post title already exists');
    });
  }

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: { select: { username: true } } },
    });
  }

  findAllByUsername(username: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: { select: { username: true } } },
      where: {
        author: {
          username,
        },
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
