import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductCategory } from '../model';
import { QueueEnum } from './QueueEnum';

export class GetProductCategoryCommand extends RequestCommand<
  string,
  ProductCategory
> {
  action = QueueEnum.getCategory;
}
