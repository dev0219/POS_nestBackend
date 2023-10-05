import { RequestCommand } from '@wecon/domain/RequestCommand';
import { Business } from '../model/Business';
import { CreateBusinessRequest } from '../requests/createBusinessRequest';
import { QueueEnum } from './QueueEnum';

export class CreateBusinessCommand extends RequestCommand<
  CreateBusinessRequest,
  Business
> {
  action = QueueEnum.createBusiness;
}
