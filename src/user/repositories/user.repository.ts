import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { EntityRepository, MongoRepository, ObjectID } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends MongoRepository<User> {
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.create(createUserDto);
    const userSaved = await this.save(newUser);
    return userSaved;
  }

  async findOneById(id: ObjectID): Promise<User> {
    const user = this.findOne(id);
    return user;
  }

  async updatePartialUser(id: ObjectID, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = await this.save({ ...user, ...updateUserDto });
    return updatedUser;
  }
}
