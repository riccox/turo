import type { NextApiRequest, NextApiResponse } from 'next';
import { getRedisClient } from '@/util/redis';
import { Turo } from '@/types';
import { RespUtil } from '@/util/api/response';
import { checkIsSetup, setAppVersion } from '@/util/system';
import { addUser } from '@/util/redis/user';

type Data = {};

// noinspection JSUnusedGlobalSymbols
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = getRedisClient();
  const {
    admin: { username, password },
  } = req.body as {
    admin: Turo.LoginCredential;
  };

  const isSetup = await checkIsSetup();
  if (isSetup) {
    RespUtil.failNextApi<Data>(res, Turo.StatusCode.INITIAL_SETUP_ALREADY);
  } else {
    const added = await addUser(client, { username, role: Turo.Role.ADMIN }, password);
    if (added) {
      // mark current version
      await setAppVersion();
      // TODO
      RespUtil.succNextApi(res);
    } else {
      RespUtil.failNextApi<Data>(res);
    }
  }
}
