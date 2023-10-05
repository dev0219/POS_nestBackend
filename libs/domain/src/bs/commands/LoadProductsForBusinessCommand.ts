import { RequestCommand } from '@wecon/domain/RequestCommand';
import { LoadProductsForBusinessRequest } from '../requests/loadProductsForBusinessRequest';
import { QueueEnum } from './QueueEnum';

export class LoadProductsForBusinessCommand extends RequestCommand<
  LoadProductsForBusinessRequest,
  number
> {
  action = QueueEnum.loadProductsForBusiness;
}
