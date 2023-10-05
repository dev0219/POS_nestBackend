import { ApiProperty } from "@nestjs/swagger";

export class CreateProductCategoryRequest {

  @ApiProperty({ example: 'Nombre del produto category' })
  name: string;

  products_count: number;

}
