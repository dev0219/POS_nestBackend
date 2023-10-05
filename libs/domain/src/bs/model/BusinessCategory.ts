import { IEntity } from '../../IEntity';
import { BaseModel } from '../../model/BaseModel';
import { BusinessType } from './BusinessType';
import { Business } from './Business';

export class BusinessCategory extends BaseModel implements IEntity {
  name: string;

  business?: Promise<Business[]>;

  business_type?: Promise<BusinessType[]>;
}
