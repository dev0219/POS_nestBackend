import { RequestCommand } from '@wecon/domain/RequestCommand';
import { BusinessSuggestedTypeRequest } from '../requests/BusinessSuggestedTypeRequest';
import { QueueEnum } from './QueueEnum';

export class CreateBusinessSuggestedTypeCommand extends RequestCommand<
  BusinessSuggestedTypeRequest,
  void
> {
  action = QueueEnum.createSuggestedType;
}
