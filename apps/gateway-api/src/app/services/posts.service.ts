import { PostDto } from "@barber-shop/data-transfer-objects";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS_MICRO') private readonly client: ClientProxy) {}

  public getAllPosts() {
    const pattern = { cmd: 'GET_POSTS' };
    return this.client.send(pattern, {});
  }

  public getAccountPosts(userId: string) {
    const pattern = { cmd: 'GET_MY_POSTS' };
    return this.client.send(pattern, { userId })
  }

  public getHashtagPosts(hashtag: string) {
    const pattern = { cmd: 'GET_POSTS_HASHTAG' };
    return this.client.send(pattern, { hashtag });
  }

  public getPost(id: string) {
    const pattern = { cmd: 'GET_POST_ID' };
    return this.client.send(pattern, { id });
  }

  public createPost(post: PostDto) {
    const pattern = { cmd: 'SAVE_POST' };
    return this.client.send(pattern, post);
  }

  public updatePost(id: string, post: PostDto) {
    const pattern = { cmd: 'UPDATE_POST' };
    return this.client.send(pattern, { id, post });
  }

  public deletePost(id: string) {
    const pattern = { cmd: 'DELETE_POST' };
    return this.client.send(pattern, { id });
  }
}