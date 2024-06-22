import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserListDTO } from './dto/UserList.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async userList() {
    const usersSaved = await this.userRepository.find();
    const userList = usersSaved.map(
      (user) => new UserListDTO(user.id, user.name),
    );

    return userList;
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: string) {
    this.userRepository.delete(id);
  }
}
