import { RequestCommand } from '@wecon/domain/RequestCommand';
import { Product } from '../model';
import { GetProductsRequest } from '../requests/GetProductsRequest';
import { QueueEnum } from './QueueEnum';

export class GetProductsCommand extends RequestCommand<
  GetProductsRequest,
  Product[]
> {
  action = QueueEnum.getProducts;
}
