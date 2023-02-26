import { UserDto } from '../resources/user/dto/user.dto';
import { User } from '../resources/user/entities/user.entity';

export const convertUserDateToNumber = (user: User) => {
  const updatedAt = user.updatedAt.getTime();
  const createdAt = user.createdAt.getTime();
  return { ...user, createdAt, updatedAt };
};

export const convertUsersDateToNumber = (users: User[]) => {
  const convertedUsers = users.map((user) => convertUserDateToNumber(user));

  return convertedUsers;
};

export const deleteUsersPassword = (users): UserDto[] => {
  const convertedUsers = users.map((user) => {
    delete user.password;
    return user;
  });

  return convertedUsers;
};
