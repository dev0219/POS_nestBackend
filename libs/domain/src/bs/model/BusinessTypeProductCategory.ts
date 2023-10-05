import { IEntity } from '@wecon/domain/IEntity';
import { BaseModel } from '@wecon/domain/model/BaseModel';

export class BusinessTypeProductCategory extends BaseModel implements IEntity {
  business_type_id: string;

  product_category_id: string;
}
