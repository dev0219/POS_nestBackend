import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductType } from '../model';
import { QueueEnum } from './QueueEnum';
import { CreateProductTypeRequest } from '../requests/createProductTypeRequest';

export class CreateProductTypeCommand extends RequestCommand<
CreateProductTypeRequest,
ProductType
> {
  action = QueueEnum.createProductType;
}
