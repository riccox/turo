import type { NextApiRequest, NextApiResponse } from 'next';
import { getRedisClient } from '@/util/redis';
import { Turo } from '@/types';
import { RespUtil } from '@/util/api/response';
import { getHashedPasswordByUsername, getUserProfileByUsername } from '@/util/redis/user';
import { generateUserToken } from '@/util/api/token';

const passwordHash = require('password-hash');

export type LoginResponseData = { profile: Turo.UserProfile; accessToken: string };

// noinspection JSUnusedGlobalSymbols
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    RespUtil.requestMethodNotAllow(res);
    return;
  }

  const client = getRedisClient();
  const { username, password } = req.body as Turo.LoginCredential;

  const profile = await getUserProfileByUsername(client, username);
  if (profile) {
    const hashedPassword = await getHashedPasswordByUsername(client, username);

    const pass = passwordHash.verify(password, hashedPassword);

    if (pass) {
      RespUtil.ofDataNextApi<LoginResponseData>(res, {
        profile,
        accessToken: generateUserToken(profile.username),
      });
    } else {
      RespUtil.failNextApi<LoginResponseData>(res, Turo.StatusCode.WRONG_PASSWORD);
    }
  } else {
    RespUtil.failNextApi<LoginResponseData>(res, Turo.StatusCode.USER_NOT_EXIST);
  }
}
