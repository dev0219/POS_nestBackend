import { ApiProperty } from "@nestjs/swagger";

export class CreateProductTypeRequest {

  @ApiProperty({ example: 'Nombre del produto type' })
  name: string;

  @ApiProperty({ required: false, nullable: true, example: 'ebf7d7b3-01b6-4e70-aca2-a5a438d20dfb' })
  product_category_id: string;

}
