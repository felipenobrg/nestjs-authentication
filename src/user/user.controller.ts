import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/UserList.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

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
    const savedUsers = await this.userService.userList();
    return savedUsers;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() dataForUpdate: UpdateUserDTO,
  ) {
    const userUpdated = await this.userRepository.update(id, dataForUpdate);

    return {
      user: userUpdated,
      message: 'User updated with sucess',
    };
  }

  @Delete()
  async removeUser(@Param('id') id: string) {
    const userRemoved = await this.userRepository.remove(id);

    return {
      user: userRemoved,
      message: 'User removed with sucess',
    };
  }
}
