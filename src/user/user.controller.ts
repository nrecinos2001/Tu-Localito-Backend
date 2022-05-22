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
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const createUser = await this.userService.create(createUserDto);
    return res.status(createUser.status).send(createUser.data);
  }

  @Get()
  async findAll(@Res() res) {
    const users = await this.userService.findAll();
    return res.status(users.status).send(users.data);
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: ObjectID) {
    const user = await this.userService.findOne(id);
    return res.status(user.status).send(user.data);
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: ObjectID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userToUpdate = await this.userService.update(id, updateUserDto);
    return res.status(userToUpdate.status).send(userToUpdate.data);
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: ObjectID) {
    const deleteUser = await this.userService.remove(id);
    return res.status(deleteUser.status).send(deleteUser.data);
  }
}
