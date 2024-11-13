import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) { }

  async findUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({});
      if (!users) {
        throw new HttpException('Users not Found', HttpStatus.NOT_FOUND);
      }
      return this.userRepository.find({});
    } catch (error) {
      throw new HttpException(
        'An error ocurred finding users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(email: string, birthday: string): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        userId: uuidv4(),
        email: email,
        birthday: birthday,
        favoriteFoods: [],
      });

      return newUser;
    } catch (error) {
      throw new HttpException(
        'An error ocurred saving User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    try {
      const updateUser: User = await this.userRepository.findOneAndUpdate(
        { userId },
        userUpdates,
      );
      if (!updateUser) {
        throw new HttpException(
          'An error ocurred updating user',
          HttpStatus.BAD_REQUEST,
        );
      }
      return;
    } catch (error) {
      throw new HttpException(
        'An error ocurred updating User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
