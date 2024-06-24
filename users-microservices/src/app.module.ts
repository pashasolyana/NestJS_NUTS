import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Payment } from './typeorm/entities/Payment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [User, Payment],
      synchronize: true,
      username: 'testuser',
      password: 'qwerty1234',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
