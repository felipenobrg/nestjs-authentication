import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async isEmailExists(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);

    return possibleUser !== undefined;
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    const possibleUser = this.users.find((userSave) => userSave.id === id);

    if (!possibleUser) {
      throw new Error("User don't exist");
    }

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      possibleUser[key] = value;
    });

    return possibleUser;
  }
}
