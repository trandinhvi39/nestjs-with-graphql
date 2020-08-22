import { Module, Global } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

require('dotenv').config();

@Global()
@Module({
  providers: [
    {
      provide: 'pubsub',
      useValue: new RedisPubSub({
        connection: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          retry_strategy: (options) =>
            Math.max(options.attempt * 100, parseInt(process.env.PUBSUB_RECONNECT_TIME)),
        },
      }),
    },
  ],
  exports: ['pubsub'],
})
export class PubSubModule {}
