import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserListDTO } from './dto/UserList.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async userList() {
    const usersSaved = await this.userRepository.find();
    const userList = usersSaved.map(
      (user) => new UserListDTO(user.id, user.name),
    );

    return userList;
  }
}
