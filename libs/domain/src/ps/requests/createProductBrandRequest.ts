import { ApiProperty } from "@nestjs/swagger";

export class CreateProductBrandRequest {

  @ApiProperty({ example: 'Nombre del produto brand' })
  name: string;

  products_count: number;

}
