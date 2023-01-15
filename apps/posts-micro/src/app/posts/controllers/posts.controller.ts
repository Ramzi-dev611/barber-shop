import { Controller } from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { MessagePattern } from "@nestjs/microservices";
import { MyPostsPayload, PostDto, PostIdPayload, PostsByHashtagPayload, UpdatePostDto } from "@barber-shop/data-transfer-objects";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @MessagePattern({ cmd: 'GET_POSTS' })
  public async getAllPosts(): Promise<PostDto[]> {
    return await this.postsService.getAllPosts();
  }

  @MessagePattern({ cmd: 'GET_MY_POSTS' })
  public async getMyPosts(payload: MyPostsPayload): Promise<PostDto[]> {
    const { userId } = payload;
    return await this.postsService.getPostsByUserId(userId);
  }

  @MessagePattern({ cmd: 'GET_POSTS_HASHTAG' })
  public async getPostsByHashtag(
    payload: PostsByHashtagPayload
  ): Promise<PostDto[]> {
    const { hashtag } = payload;
    return await this.postsService.getPostsByHashtag(hashtag);
  }

  @MessagePattern({ cmd: 'GET_POST_ID' })
  public async getPost(payload: PostIdPayload): Promise<PostDto> {
    const { id } = payload;
    return await this.postsService.getPostById(id);
  }

  @MessagePattern({ cmd: 'SAVE_POST' })
  public async savePost(payload: PostDto): Promise<PostDto> {
    return await this.postsService.createPost(payload);
  }

  @MessagePattern({ cmd: 'UPDATE_POST' })
  public async updatePost(payload: UpdatePostDto): Promise<PostDto> {
    const { id, post } = payload;
    return await this.postsService.updatePost(id, post);
  }

  @MessagePattern({ cmd: 'DELETE_POST' })
  public async deletePost(payload: PostIdPayload) {
    const { id } = payload;
    return await this.postsService.deletePost(id);
  }
}