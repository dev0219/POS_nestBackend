import { IEntity } from '@wecon/domain/IEntity';
import { BaseModel } from '@wecon/domain/model/BaseModel';

export class BusinessProduct extends BaseModel implements IEntity {
  business_id: string;

  product_id: string;
}
