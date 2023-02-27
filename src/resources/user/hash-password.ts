import { authConfig } from '../../config';
import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const genSalt = await bcrypt.genSalt(+authConfig.CRYPT_SALT);
  return await bcrypt.hash(password, genSalt);
};

export const isPasswordMatch = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
