import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { GetUser } from "../decorators/get-user.decorator";
import { PostDto, UserDto } from "@barber-shop/data-transfer-objects";
import { AuthGuard } from "@nestjs/passport";
import { RoleAuthGuard } from "../guards/role.guard";
import { Role } from "../decorators/role.decorator";

@UseGuards(AuthGuard('jwt'), RoleAuthGuard)
@Role('user')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  public getAllPosts() {
    return this.postsService.getAllPosts();
  }
  @Get('/hashtag/:hashtag')
  public getPostsByHashtag(@Param('hashtag') hashtag: string) {
    return this.postsService.getHashtagPosts(hashtag);
  }
  @Get('/me')
  public getPostsAccount(@GetUser() user: UserDto) {
    return this.postsService.getHashtagPosts(user.id);
  }

  @Get('/:id')
  public getPostsById(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post()
  public createPost(@GetUser() user: UserDto, @Body() payload: PostDto) {
    payload.userId = user.id;
    return this.postsService.createPost(payload);
  }

  @Put('/:id')
  public updatePost(
    @Param('id') id: string,
    @GetUser() user: UserDto,
    @Body() payload: PostDto
  ) {
    if (payload.userId !== user.id) {
      throw new UnauthorizedException("Can't change what is not your post");
    }
    return this.postsService.updatePost(id, payload);
  }

  @Delete('/:id')
  public deletePost(@Param('id') id: string, @GetUser() user: UserDto) {
    return new Promise((resolve, e) => {
      this.postsService.getPost('id').subscribe({
        next: (data: PostDto) => {
          if (data.userId !== user.id) {
            throw new UnauthorizedException(
              "Can't delete what is not your post"
            );
          }
          resolve(this.postsService.updatePost(id, data));
        },
        error: (err) => {
          e(err);
        },
      });
    });
  }
}