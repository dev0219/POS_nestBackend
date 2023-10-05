import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductBrand } from '../model';
import { QueueEnum } from './QueueEnum';
import { CreateProductBrandRequest } from '../requests/createProductBrandRequest';

export class CreateProductBrandCommand extends RequestCommand<
CreateProductBrandRequest,
ProductBrand
> {
  action = QueueEnum.createProductCategory;
}
