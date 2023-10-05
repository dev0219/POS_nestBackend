import { RequestCommand } from '@wecon/domain/RequestCommand';
import { Product } from '../model';
import { QueueEnum } from './QueueEnum';

export class GetProductDetailCommand extends RequestCommand<string, Product> {
  action = QueueEnum.getProductDetail;
}
