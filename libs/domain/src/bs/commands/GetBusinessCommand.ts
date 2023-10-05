import { RequestCommand } from '@wecon/domain/RequestCommand';
import { Business } from '../model/Business';
import { QueueEnum } from './QueueEnum';

export class GetBusinessCommand extends RequestCommand<string, Business> {
  action = QueueEnum.getBusiness;
}
