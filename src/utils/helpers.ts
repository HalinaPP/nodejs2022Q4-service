import { access, appendFile, mkdir, readdir } from 'fs/promises';
import { logDirectory } from 'src/config';
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

export const isEmpty = (value) =>
  value === undefined || value === '' || Object.is(value, null);

export const isExists = async (sourceName: string) => {
  let isSourceExists = false;

  try {
    await access(sourceName);
    isSourceExists = true;
  } catch (err) { }

  return isSourceExists;
};

export const writeToFile = async (fileName: string, message: string) => {
  const logFolder = `${process.cwd()}/${logDirectory}/`;
  try {
    await readdir(logFolder);
  } catch (err) {
    await mkdir(logFolder, { recursive: true });
  }

  const source = `${logFolder}${fileName}`;

  const line = message + '\r\n';
  await appendFile(source, line);
};
