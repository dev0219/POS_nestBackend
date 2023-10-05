import { UserModel } from '@wecon/domain/ids';
import { BaseEvent } from './BaseEvent';

export class UserCreatedEvent extends BaseEvent<UserModel> {
  transactionID: string;
}
