import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectID } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.userService.create(createUserDto);
    return createUser;
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: ObjectID) {
    const user = await this.userService.findOne(id);
    return res.status(user.status).send(user.data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: ObjectID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: ObjectID) {
    const deleteUser = await this.userService.remove(id);
    return res.status(deleteUser.status).send(deleteUser.data);
  }
}
