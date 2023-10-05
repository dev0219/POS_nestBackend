import { IEntity } from '@wecon/domain/IEntity';
import { BaseModel } from '@wecon/domain/model/BaseModel';
import { Business } from './Business';
import { BusinessCategory } from './BusinessCategory';

export class BusinessType extends BaseModel implements IEntity {
  name: string;

  business?: Promise<Business[]>;

  business_category?: Promise<BusinessCategory>;

  business_category_id: string;
}
