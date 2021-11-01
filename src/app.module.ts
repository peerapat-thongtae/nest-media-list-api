import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/entities/list.entity';
import { MediaListModule } from './media-list/media-list.module';
import { MediasModule } from './medias/medias.module';
import { Media } from './medias/entities/media.entity';
import { MediaList } from './media-list/entities/media-list.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Todo, List, MediaList, Media],
      synchronize: true,
    }),
    UsersModule,
    TodoModule,
    ListsModule,
    MediaListModule,
    MediasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
