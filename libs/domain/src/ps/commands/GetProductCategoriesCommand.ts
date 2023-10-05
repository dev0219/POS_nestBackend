import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductCategory } from '../model';
import { QueueEnum } from './QueueEnum';

export class GetProductCategoriesCommand extends RequestCommand<
  void,
  ProductCategory[]
> {
  action = QueueEnum.getCategories;
}
