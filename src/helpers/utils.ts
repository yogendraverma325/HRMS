import { Request } from 'express';
import moment from 'moment';
import Logger from '../core/Logger.js';

import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

// Define Kafka broker
export const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: ['localhost:9092'] // Replace with your Kafka broker's address
});


export function findIpAddress(req: Request) {
  try {
    if (req.headers['x-forwarded-for']) {
      return req.headers['x-forwarded-for'].toString().split(',')[0];
    } else if (req.connection && req.connection.remoteAddress) {
      return req.connection.remoteAddress;
    }
    return req.ip;
  } catch (e) {
    Logger.error(e);
    return undefined;
  }
}

export function addMillisToCurrentDate(millis: number) {
  return moment().add(millis, 'ms').toDate();
}
