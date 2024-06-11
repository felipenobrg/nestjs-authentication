import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/UserList.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new UserListDTO(userEntity.id, userEntity.name),
      message: 'User created with sucess',
    };
  }

  @Get()
  async usersList() {
    const saveUsers = await this.userRepository.list();
    const usersList = saveUsers.map(
      (user) => new UserListDTO(user.id, user.name),
    );
    return usersList;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() dataForUpdate: UpdateUserDTO,
  ) {
    const userUpdated = await this.userRepository.update(id, dataForUpdate);

    return {
      user: userUpdated,
      message: 'User updated with suces',
    };
  }
}
