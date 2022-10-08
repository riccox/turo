import { Turo } from '@/types';
import { getRedisClient } from '@/util/redis';
import * as fs from 'fs';
import _ from 'lodash';
import packageJson from '@/package.json';

export const getCurrentVersionHash = (): string => {
  const rev = fs.readFileSync('.git/HEAD').toString().trim();
  if (rev.indexOf(':') === -1) {
    return rev;
  } else {
    return fs
      .readFileSync('.git/' + rev.substring(5))
      .toString()
      .trim();
  }
};

export const setAppVersion = async () => {
  const client = getRedisClient();
  const version: Turo.AppVersion = {
    hash: getCurrentVersionHash(),
    release: packageJson.version,
  };
  await client.hset('version', version);
};

export const getAppVersion = async (): Promise<Turo.AppVersion> => {
  const client = getRedisClient();
  return (await client.hgetall('version')) as unknown as Turo.AppVersion;
};

export const checkIsSetup = async (): Promise<boolean> => {
  return !_.isEmpty(await getAppVersion());
};
