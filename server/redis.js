import redis from 'redis';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
import { REDIS_URL } from './config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
let client = redis.createClient(REDIS_URL);

//export const close = ()=>client.end();

export default client;
