import { RequestCommand } from '@wecon/domain/RequestCommand';
import { Product } from '../model/Product';
import { QueueEnum } from './QueueEnum';
import { CreateProductRequest } from '../requests/createProductRequest';

export class CreateProductCommand extends RequestCommand<
  CreateProductRequest,
  Product
> {
  action = QueueEnum.createProduct;
}
