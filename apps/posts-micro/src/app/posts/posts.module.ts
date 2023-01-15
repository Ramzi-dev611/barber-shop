import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
