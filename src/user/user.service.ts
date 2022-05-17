import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from 'src/user/repositories/user.repository';
import { ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async validateExisitingUser(id: ObjectID): Promise<boolean> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) return false;
    return true;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createNewUser = await this.usersRepository.createUser(createUserDto);
    return createNewUser;
  }

  async findAll() {
    const users = this.usersRepository.find();
    return users;
  }

  async findOne(id: ObjectID) {
    const isUserOnDB = await this.validateExisitingUser(id);
    if (!isUserOnDB)
      return { status: 404, data: { status: 404, message: 'User not found' } };
    const user = await this.usersRepository.findOneById(id);
    return { status: 200, data: user };
  }

  async update(id: ObjectID, updateUserDto: UpdateUserDto) {
    const isUserOnDB = await this.validateExisitingUser(id);
    if (!isUserOnDB)
      return { status: 404, data: { status: 404, message: 'User Not found' } };
    // Agregar validacion si es el mismo
    // Agregar Validacion de Rol
    const userToUpdate = await this.usersRepository.updatePartialUser(id, updateUserDto);
    return { status: 404, data: userToUpdate };
  }

  async remove(id: ObjectID) {
    const isUserOnDB = await this.validateExisitingUser(id);
    if (!isUserOnDB)
      return { status: 404, data: { status: 404, message: 'User not found' } };
    const user = await this.usersRepository.findOneById(id);
    // Agregar validacion si es el mismo
    // Agregar Validacion de Rol
    const userDeleted = this.usersRepository.remove(user);
    return { status: 204, data: {} };
  }
}
