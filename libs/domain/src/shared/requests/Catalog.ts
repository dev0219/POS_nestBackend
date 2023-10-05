import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export type CatalogsType = 'basics' | 'clients' | 'productcategories';

export class Catalog {
  @IsNotEmpty()
  @IsIn(['basics', 'clients', 'productcategories'])
  key: CatalogsType;

  @IsOptional()
  @IsInt()
  version?: number;

  @ApiProperty({
    description: 'Business ID',
    example: '901b3a4b-4ea6-4fab-a328-f72fc4010cec',
    required: true,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'The businessId field is required.' })
  @IsString({ message: 'The businessId field is invalid.' })
  @IsUUID('all', { message: 'The businessId field has an invalid format' })
  businessId?: string;
}
