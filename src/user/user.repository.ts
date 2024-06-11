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

  private searchId(id: string) {
    const possibleUser = this.users.find((userSave) => userSave.id === id);

    if (!possibleUser) {
      throw new Error("User don't exist");
    }

    return possibleUser;
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    const user = this.searchId(id);
    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async remove(id: string) {
    const user = this.searchId(id);
    this.users = this.users.filter((userSave) => userSave.id !== id);
    return user;
  }
}
