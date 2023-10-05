import { ApiProperty } from "@nestjs/swagger";
// import { ProductType } from "../model";

export class CreateProductRequest {

  @ApiProperty({ example: 'Nombre del produto' })
  name: string;

  @ApiProperty({ required: false, nullable: true, example: '1234567890' })
  barcode: string;

  @ApiProperty({ required: false, nullable: true, example: 'Nombre corto del produto' })
  short_name: string;

  @ApiProperty({ required: false, nullable: true, example: '' })
  measure: number;

  @ApiProperty({ required: false, nullable: true, example: 'ebf7d7b3-01b6-4e70-aca2-a5a438d20dfb' })
  product_type_id: string;

  @ApiProperty({ required: false, nullable: true, example: 'ebf7d7b3-01b6-4e70-aca2-a5a438d20dfb' })
  product_brand_id: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  photo: Express.Multer.File;

  photoUrl: string;


}
