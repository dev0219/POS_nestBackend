import { ApiProperty } from '@nestjs/swagger';

export class LoadProductsForBusinessRequest {
  @ApiProperty({
    description: 'List of product Ids will be add to the bussiness',
    example: [
      '14398f60-fc01-4777-a273-a2494afcbc58',
      '942a903d-bd8c-4e0f-ac2b-e61dc4c3512a',
    ],
  })
  products: string[];

  @ApiProperty({
    description:
      'Get all the products with are related with this category to be added to the bussiness',
    example: [
      '063bb625-960c-4571-b381-89628570640b',
      '942a903d-bd8c-4e0f-ac2b-e61dc4c3512a',
    ],
  })
  productCategories: string[];

  @ApiProperty({
    description:
      'Get all the products with are related with this category id and brand id to be added to the business',
    example: [
      {
        categoryId: '063bb625-960c-4571-b381-89628570640b',
        brandId: 'dbf4b3e4-8fce-43b5-85a6-4211578248fc',
      },
      {
        categoryId: '063bb625-960c-4571-b381-89628570640b',
        brandId: 'dbf4b3e4-8fce-43b5-85a6-4212578248fc',
      },
    ],
  })
  productBrandCategories: { categoryId: string; brandId: string }[];

  businessId: string;
}
