import { IEntity } from '@wecon/domain/IEntity';
import { BaseModel } from '@wecon/domain/model/BaseModel';

export class BusinessEvent extends BaseModel implements IEntity {
  version: number;

  event_type: number;
}
