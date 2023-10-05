import { ApiProperty } from '@nestjs/swagger';
import { Point } from 'typeorm';
import { BusinessType } from '../model';

export class CreateBusinessRequest {
  @ApiProperty({ example: 'Nombre del negocio' })
  name: string;

  @ApiProperty({ uniqueItems: true, example: 'Dirección del negocio' })
  address: string;

  @ApiProperty({ type: String, example: '0,0' })
  gps: Point;

  @ApiProperty({ required: false, nullable: true, example: '1234567890' })
  phone: string;

  @ApiProperty({
    required: false,
    nullable: true,
    type: String,
    example: 'ebf7d7b3-01b6-4e70-aca2-a5a438d20dfb',
  })
  business_type?: Promise<BusinessType>;

  @ApiProperty({
    required: false,
    nullable: true,
    example: 'Nombre del tipo de negocio',
  })
  business_type_suggested?: string;
}
