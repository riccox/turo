import jwt from 'jsonwebtoken';
import { PickFieldType, Turo } from '@/types';

export const generateUserToken = (username: PickFieldType<Turo.UserProfile, 'username'>): string => {
  return jwt.sign({ username, iss: 'Turo' }, process.env.AUTH_SECRET as string, {
    //unit s
    expiresIn: 60 * 60 * 24 * 3, // 3d
  });
};
