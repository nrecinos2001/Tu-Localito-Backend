import { Injectable } from '@nestjs/common';
import {
  createdResponse,
  emptyResponse,
  notFoundResponse,
  okResponse,
} from 'src/common/helpers';
import { UsersRepository } from 'src/user/repositories/user.repository';
import { ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validateExisitingUser(id: ObjectID): Promise<boolean> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) return false;
    return true;
  }

  async create(createUserDto: CreateUserDto) {
    const createNewUser = await this.usersRepository.createUser(createUserDto);
    return createdResponse(createNewUser);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return okResponse(users);
  }

  async findOne(id: ObjectID) {
    const isUserOnDB = await this.validateExisitingUser(id);
    if (!isUserOnDB) return notFoundResponse();
    const user = await this.usersRepository.findOneById(id);
    return okResponse(user);
  }

  async update(id: ObjectID, updateUserDto: UpdateUserDto) {
    const isUserOnDB = await this.validateExisitingUser(id);
    if (!isUserOnDB) return notFoundResponse();
    // Agregar validacion si es el mismo
    // Agregar Validacion de Rol
    const userToUpdate = await this.usersRepository.updatePartialUser(
      id,
      updateUserDto,
    );
    return okResponse(userToUpdate);
  }

  async remove(id: ObjectID) {
    const isUserOnDB = await this.validateExisitingUser(id);
    if (!isUserOnDB) return notFoundResponse();
    const user = await this.usersRepository.findOneById(id);
    // Agregar validacion si es el mismo
    // Agregar Validacion de Rol
    await this.usersRepository.remove(user);
    return emptyResponse();
  }
}
