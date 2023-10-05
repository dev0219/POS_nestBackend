import { ApiProperty } from '@nestjs/swagger';
import { CatalogsType } from '../requests';

export class LinkCatalog {
  @ApiProperty({ example: 'basics' })
  key: CatalogsType;

  @ApiProperty({ example: '1702340664' })
  version?: number;

  @ApiProperty({
    example:
      'https://catalogs-local.s3.us-east-1.amazonaws.com/catalogs/basic.zip',
  })
  link?: string;

  @ApiProperty({ example: 'You have the latest version of the catalogue' })
  message?: string;
}
