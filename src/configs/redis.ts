import * as redis from 'redis';

require('dotenv').config();

const redisConnectUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const redisClient = redis.createClient(redisConnectUrl);

export default redisClient;
