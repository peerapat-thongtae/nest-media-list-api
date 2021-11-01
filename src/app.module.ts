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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'media-list',
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
