import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Catalog } from './Catalog';

export class GetCatalog {
  @ApiProperty({
    example: [
      {
        key: 'clients',
        version: 1234567890,
        businessId: '901b3a4b-4ea6-4fab-a328-f72fc4010cec',
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => Catalog)
  catalogs: Catalog[];
}
