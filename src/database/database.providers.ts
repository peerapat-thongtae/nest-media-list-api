import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

export const databaseProviders = [
  {
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'media-list',
        entities: [User],
        synchronize: false,
      }),
      UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  },
];
