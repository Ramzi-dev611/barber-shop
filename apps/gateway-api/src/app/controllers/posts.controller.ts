import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { GetUser } from "../decorators/get-user.decorator";
import { PostDto, UserDto } from "@barber-shop/data-transfer-objects";
import { AuthGuard } from "@nestjs/passport";
import { RoleAuthGuard } from "../guards/role.guard";
import { Role } from "../decorators/role.decorator";

@UseGuards(AuthGuard('jwt'), RoleAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  @Role('user')
  public getAllPosts() {
    return this.postsService.getAllPosts();
  }
  @Get('/hashtag/:hashtag')
  @Role('user')
  public getPostsByHashtag(@Param('hashtag') hashtag: string) {
    return this.postsService.getHashtagPosts(hashtag);
  }
  @Get('/me')
  @Role('user')
  public getPostsAccount(@GetUser() user: UserDto) {
    return this.postsService.getHashtagPosts(user.id);
  }

  @Get('/:id')
  @Role('user')
  public getPostsById(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post()
  @Role('user')
  public createPost(@GetUser() user: UserDto, @Body() payload: PostDto) {
    payload.userId = user.id;
    return this.postsService.createPost(payload);
  }

  @Put('/:id')
  @Role('user')
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
  @Role('user')
  public async deletePost(@Param('id') id: string, @GetUser() user: UserDto) {
    console.log(id)
    return new Promise((resolve) => {
      this.postsService.getPost(id).subscribe({
        next: (data: PostDto) => {
          if (data.userId !== user.id) {
            throw new UnauthorizedException(
              "Can't delete what is not your post"
            );
          }
          resolve(this.postsService.deletePost(id));
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}