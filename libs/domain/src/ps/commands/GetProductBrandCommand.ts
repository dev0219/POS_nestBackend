import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductBrand } from '../model';
import { QueueEnum } from './QueueEnum';

export class GetProductBrandCommand extends RequestCommand<
  string,
  ProductBrand
> {
  action = QueueEnum.getBrand;
}
