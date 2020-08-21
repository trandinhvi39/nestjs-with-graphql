const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

require('dotenv').config();

const logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
});

if (process.env.APP_ENV !== 'dev') {
  const cloudwatchConfig = {
    logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
    logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.APP_ENV}`,
    awsAccessKeyId: process.env.ACCESS_KEY,
    awsSecretKey: process.env.SECRET_KEY,
    awsRegion: process.env.CLOUDWATCH_REGION,
    messageFormatter: ({ level, message, additionalInfo }) =>
      `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`,
  };
  logger.add(new WinstonCloudWatch(cloudwatchConfig));
}

export default logger;
