import Redis from 'ioredis';

export const REDIS_KEY_PREFIX = process.env.REDIS_KEY_PREFIX ?? 'turo::';

let client: Redis;

export const getRedisClient = (): Redis => {
  const cl =
    client ??
    new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,
      db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : undefined,
      tls: process.env.REDIS_TLS_ENABLE ? {} : undefined,
      keyPrefix: REDIS_KEY_PREFIX,
    });
  client = cl;

  cl.on('error', (err) => console.log('[Redis Client]', 'Error', err));

  return cl;
};

export const makeRedisKey = (...k: string[]) => [...k].join('::');
