import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body()
    createPostDto: {
      title: string;
      body: string;
      username: string;
    },
  ) {
    const { title, body, username } = createPostDto;
    return this.postsService.create({
      title,
      body,
      author: {
        connect: { username },
      },
    });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':username')
  findAllByAuthor(@Param('username') username: string) {
    return this.postsService.findAllByUsername(username);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
