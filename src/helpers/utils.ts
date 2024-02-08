import { Request } from 'express';
import moment from 'moment';
import Logger from '../core/Logger.js'
import { Client } from '@elastic/elasticsearch';

export const elasticSearchClient: Client = new Client({ node: 'http://localhost:9200' });
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
