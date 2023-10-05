import { BaseModel } from '../../model/BaseModel';
import { IEntity } from '../../IEntity';
import { Point } from 'geojson';
import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from './BusinessType';

export class Business extends BaseModel implements IEntity {
  @ApiProperty()
  name: string;

  @ApiProperty({ uniqueItems: true })
  address: string;

  @ApiProperty()
  gps: Point;

  @ApiProperty({ required: false, nullable: true })
  phone: string;

  @ApiProperty({ required: false, nullable: true })
  business_type?: Promise<BusinessType>;

  @ApiProperty({ required: false, nullable: true })
  business_type_id?: string;
}
