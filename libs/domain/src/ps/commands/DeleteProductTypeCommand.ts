import { RequestCommand } from '@wecon/domain/RequestCommand';
import { ProductType } from '../model';
import { QueueEnum } from './QueueEnum';

export class DeleteProductTypeCommand extends RequestCommand<string, ProductType> {
  action = QueueEnum.delProductType;
}
