import { IEntity } from '@wecon/domain/IEntity';
import { BaseModel } from '@wecon/domain/model/BaseModel';

export class BusinessTypeSuggested extends BaseModel implements IEntity {
  name?: string;

  business?: string;

  business_category?: string;
}
