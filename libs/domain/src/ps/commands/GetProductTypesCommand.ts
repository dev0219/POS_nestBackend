import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductType } from '../model';
import { GetProductTypesRequest } from '../requests/GetProductTypesRequest';
import { QueueEnum } from './QueueEnum';

export class GetProductTypesCommand extends RequestCommand<
GetProductTypesRequest,
  ProductType[]
> {
  action = QueueEnum.getProductTypes;
}
