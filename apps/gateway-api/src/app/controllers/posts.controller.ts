import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UnauthorizedException, UseGuards } from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { GetUser } from "../decorators/get-user.decorator";
import { PostDto, UserDto } from "@barber-shop/data-transfer-objects";
import { AuthGuard } from "@nestjs/passport";
import { RoleAuthGuard } from "../guards/role.guard";
import { Role } from "../decorators/role.decorator";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";
import { v4 as uuidv4 } from 'uuid';

@UseGuards(AuthGuard('jwt'), RoleAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @InjectMetric('HTTP_REQUEST_TOTAL')
    private readonly requestCounter: Counter,
    @InjectMetric('QUERIES_PER_HASHTAG')
    private readonly hashtagCounter: Counter
  ) {}

  private readonly logger = new Logger();

  @Get()
  @Role('user')
  public getAllPosts() {
    const requestID = uuidv4();
    const response = this.postsService.getAllPosts();
    return new Promise((resolve) => {
      response.subscribe({
        next: (data: PostDto[]) => {
          this.requestCounter.labels({method: 'GET_ALL_POSTS', status: '200'}).inc();
          this.logger.log({ request_id: requestID, content: `Number of posts = ${data.length}` });
          resolve(data);
        },
        error: (error) => {
          this.logger.error({
            request_id: requestID,
            content: error,
          });
          return { error: 'Something happened while getting posts' }
        }
      })
    })
  }
  @Get('/hashtag/:hashtag')
  @Role('user')
  public getPostsByHashtag(@Param('hashtag') hashtag: string) {
    const requestID = uuidv4();
    const response = this.postsService.getHashtagPosts(hashtag);
    return new Promise((resolve) => {
      response.subscribe({
        next: (data: PostDto[]) => {
          this.hashtagCounter
            .labels({
              label: hashtag,
              method: 'GET',
            }).inc();
          this.requestCounter
            .labels({
              method: 'GET_HASHTAG_POSTS',
              status: '200',
            }).inc();
          this.logger.log({
            request_id: requestID,
            content: `Number of posts by the hashtag ${hashtag} = ${data.length}`,
          });
          resolve(data);
        },
        error: (error) => {
          this.logger.error({
            request_id: requestID,
            content: error,
          });
          return { error: 'Something happened while getting posts' };
        },
      });
    });
  }
  @Get('/me')
  @Role('user')
  public getPostsAccount(@GetUser() user: UserDto) {
    try {
      console.log();
    } catch (error) {
      this.logger.error(error);
    }
    return this.postsService.getAccountPosts(user.id);
  }

  @Get('/:id')
  @Role('user')
  public getPostsById(@Param('id') id: string) {
    try {
      console.log();
    } catch (error) {
      this.logger.error(error);
    }
    return this.postsService.getPost(id);
  }

  @Post()
  @Role('user')
  public createPost(@GetUser() user: UserDto, @Body() payload: PostDto) {
    try {
      console.log();
    } catch (error) {
      this.logger.error(error);
    }
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
    try {
      console.log();
    } catch (error) {
      this.logger.error(error);
    }
    if (payload.userId !== user.id) {
      throw new UnauthorizedException("Can't change what is not your post");
    }
    return this.postsService.updatePost(id, payload);
  }

  @Delete('/:id')
  @Role('user')
  public async deletePost(@Param('id') id: string, @GetUser() user: UserDto) {
    try {
      console.log();
    } catch (error) {
      this.logger.error(error);
    }
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