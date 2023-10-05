import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductCategory } from '../model';
import { QueueEnum } from './QueueEnum';
import { CreateProductCategoryRequest } from '../requests/createProductCategoryRequest';

export class CreateProductCategoryCommand extends RequestCommand<
CreateProductCategoryRequest,
ProductCategory
> {
  action = QueueEnum.createProductCategory;
}
