import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
