import { RequestCommand } from '@wecon/domain/RequestCommand';
import { QueueEnum } from './QueueEnum';

export class GetCategoriesByBusinessIdCommand extends RequestCommand<
  string,
  [string]
> {
  action = QueueEnum.getCategoriesByBusiness;
}
