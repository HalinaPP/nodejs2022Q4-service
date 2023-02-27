import { access, appendFile } from 'fs/promises';
import path from 'path';
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

export const getAbsolutePath = (pathValue: string) => {
  const currDir = process.cwd();
  console.log('c=', currDir);
  if (isEmpty(pathValue)) {
    return currDir;
  }
  console.log('p=', pathValue);

  const endedPath = pathValue.endsWith(':') ? pathValue + '\\' : pathValue;
  //console.log("ee=", endedPath, ' f==', path.isAbsolute(endedPath));
  //return path.isAbsolute(endedPath) ? endedPath : path.join(currDir, endedPath);
  return path.join(currDir, endedPath);
};

export const isExists = async (sourceName: string) => {
  let isSourceExists = false;

  try {
    await access(sourceName);
    isSourceExists = true;
  } catch (err) { }

  return isSourceExists;
};

export const writeToFile = async (fileName: string, message: string) => {
  // const source = getAbsolutePath(fileName ?? '');

  //const isfileExists = await isExists(fileName);
  //  if (isfileExists) {
  const line = message + '\r\n';
  await appendFile(fileName, line);
  //}
};
