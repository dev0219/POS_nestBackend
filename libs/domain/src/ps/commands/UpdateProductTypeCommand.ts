import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductType } from '../model';
import { QueueEnum } from './QueueEnum';
import { UpdateProductTypeRequest } from '../requests/updateProductTypeRequest';

export class UpdateProductTypeCommand extends RequestCommand<
UpdateProductTypeRequest,
ProductType
> {
  action = QueueEnum.updateProductType;
}
