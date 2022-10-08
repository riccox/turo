import { PickFieldType, Turo } from '@/types';
import Redis from 'ioredis';
import { makeRedisKey } from '@/util/redis';

const passwordHash = require('password-hash');

export const getHashedPasswordByUsername = async (
  client: Redis,
  username: PickFieldType<Turo.UserProfile, 'username'>
): Promise<string | null> => {
  return client.get(makeRedisKey('user', 'password', username));
};

export const getUserProfileByUsername = async (
  client: Redis,
  username: PickFieldType<Turo.UserProfile, 'username'>
): Promise<Turo.UserProfile | null> => {
  const json = await client.hgetall(makeRedisKey('user', 'profile', username));
  if (json) {
    return json as unknown as Turo.UserProfile;
  } else {
    throw null;
  }
};

export const addUser = async (client: Redis, profile: Turo.UserProfile, password: string): Promise<boolean> => {
  const profileAdded = await client.hset(makeRedisKey('user', 'profile', profile.username), profile);
  const passwordAdded = await client.set(
    makeRedisKey('user', 'password', profile.username),
    passwordHash.generate(password)
  );
  return profileAdded > 0 && passwordAdded === 'OK';
};
