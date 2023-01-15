import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEntity } from "../entities/posts.entity";
import { HashtagEnum } from "../enums/hashtag.enum";
import { PostDto, UserDto } from "@barber-shop/data-transfer-objects";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly repo: Repository<PostEntity>
  ) {}

  public async getAllPosts(): Promise<PostEntity[]> {
    return await this.repo.find();
  }

  public async getPostById(id: string): Promise<PostEntity> {
    return await this.repo.findOneBy({ id });
  }

  public async getPostsByUserId(userId: string): Promise<PostEntity[]> {
    return await this.repo.findBy({ userId });
  }

  public async getPostsByHashtag(hashtag: HashtagEnum | string): Promise<PostEntity[]> {
    return await this.repo.findBy({ hashtag });
  }

  public async createPost(post: PostDto): Promise<PostEntity> {
    return await this.repo.save(post);
  }

  public async updatePost(id: string, post: PostDto): Promise<PostEntity> {
    const newEntity = await this.repo.preload({
      id,
      ...post
    });
    if (newEntity) {
      this.repo.save(newEntity);
      return newEntity;
    } else throw new NotFoundException('user with provided id not found');
  }

  public async deletePost(id: string) {
    return this.repo.delete({ id });
  }
}