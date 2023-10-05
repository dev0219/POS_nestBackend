import { Body, Controller, Get, Delete, Put, HttpException, Param, Query, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
  ApiConsumes
} from '@nestjs/swagger';
import { CommandsService } from '@wecon/events';
import { FileInterceptor } from '@nestjs/platform-express';
import { RemoteStorageService } from '@wecon/remote-storage';
import { Express } from 'express';
import { ErrorCodeEnum } from '../errors/ErrorCodeEnum';
import { CreateProductRequest } from '@wecon/domain/ps/requests/createProductRequest';
import { CreateProductCategoryRequest } from '@wecon/domain/ps/requests/createProductCategoryRequest';
import { CreateProductBrandRequest } from '@wecon/domain/ps/requests/createProductBrandRequest';
import { CreateProductCommand } from '@wecon/domain/ps/commands/CreateProductCommand';
import { CreateProductCategoryCommand } from '@wecon/domain/ps/commands/CreateProductCategoryCommand';
import { CreateProductBrandCommand } from '@wecon/domain/ps/commands/CreateProductBrandCommand';
import { Product, ProductBrand, ProductCategory, ProductType } from '@wecon/domain/ps/model';
import {
  GetProductBrandCommand,
  GetProductCategoriesCommand,
  GetProductCategoryCommand,
  GetProductDetailCommand,
  GetProductsCommand,
} from '@wecon/domain/ps/commands';
import { CreateProductTypeRequest } from '@wecon/domain/ps/requests/createProductTypeRequest';
import { CreateProductTypeCommand } from '@wecon/domain/ps/commands/CreateProductTypeCommand';
import { GetProductTypesCommand } from '@wecon/domain/ps/commands/GetProductTypesCommand';
import { GetProductTypeDetailCommand } from '@wecon/domain/ps/commands/GetProductTypeDetailCommand';
import { DeleteProductTypeCommand } from '@wecon/domain/ps/commands/DeleteProductTypeCommand';
import { UpdateProductTypeRequest } from '@wecon/domain/ps/requests/updateProductTypeRequest';
import { UpdateProductTypeCommand } from '@wecon/domain/ps/commands/UpdateProductTypeCommand';

@ApiTags('products')
@Controller('products')
@ApiResponse({
  status: 500,
  description:
    'Server error: Internal server error, check with API administrator.',
})
@ApiBadRequestResponse({
  status: 400,
  description: 'Bad request, throws error, please check body and params.',
})
@ApiUnprocessableEntityResponse({
  status: 422,
  description:
    'This error should be returned when some required fields are missing. Check the body.',
  type: String,
})
@ApiNoContentResponse({
  status: 204,
  description: 'No content found with the specify params',
})
export class ProductsController {
  constructor(
    private readonly commandsService: CommandsService,
    private readonly remoteStorageService: RemoteStorageService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new product',
  })
  @ApiCreatedResponse({
    type: Product,
    description: 'Product created successfully',
    status: 201,
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'This error should be returned when the product already exists. Check the name.',
    type: String,
  })
  @ApiNotFoundResponse({
    status: 432,
    description:
      'This error should be returned when the product type is not found. Check the UUID.',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("photo"))
  async create(@Body() product: CreateProductRequest, @UploadedFile() photo: Express.Multer.File): Promise<Product> {
    try {
      if (photo && !new RegExp(/\/(jpg|jpeg|png)$/).test(photo.mimetype))
      throw new HttpException('The file type is invalid.',422);
      if (photo) {
        const extension = photo.originalname.split('.').pop();
        const fileName = `${new Date().getTime()}-product.${extension}`;
        const name = `new_product/${fileName}`;
        await this.remoteStorageService.saveFile(
          name,
          photo.buffer,
          'Temporal Transactions',
        );
        const link = await this.remoteStorageService.getLink(name);
        product.photoUrl = link;
      }
      const productcreated = await this.commandsService.request(
        new CreateProductCommand(product),
      );
      return productcreated;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Get('')
  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiQuery({
    name: 'categoryId',
    type: String,
    description: 'Used parameter to filter by CategoryId. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'brandId',
    type: String,
    description: 'Used parameter to filter by BrandId. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'text',
    type: String,
    description: 'Used parameter to filter by name. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Used parameter to paginate the data',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'Used parameter to paginate the data',
    required: false,
  })
  async getProducts(
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
    @Query('text') text?: string,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ): Promise<Product[]> {
    try {
      return await this.commandsService.request(
        new GetProductsCommand({
          categoryId,
          brandId,
          text,
          page,
          take,
        }),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }  

  
  @Get('type')
  @ApiOperation({
    summary: 'Get all product types',
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'Used parameter to filter by name. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Used parameter to paginate the data. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'Used parameter to paginate the data. Optional',
    required: false,
  })
  async getProductTypes(
    @Query('name') name?: string,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ): Promise<ProductType[]>  {
    try {
      return await this.commandsService.request(
        new GetProductTypesCommand({
          name,
          page,
          take,
        }),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Get('/category')
  @ApiOperation({
    summary: 'Get all product categories',
  })
  async getCategories(): Promise<ProductCategory[]> {
    try {
      return await this.commandsService.request(
        new GetProductCategoriesCommand(),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }
      throw error;
    }
  }

  @Get('/:productId')
  @ApiOperation({
    summary: 'Get product detail',
  })
  @ApiParam({
    name: 'productId',
    type: String,
    description: 'Used parameter to filter by ProductId',
    required: true,
  })
  async getProductDetail(
    @Param('productId') productId?: string,
  ): Promise<Product> {
    try {
      return await this.commandsService.request(
        new GetProductDetailCommand(productId),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }
      throw error;
    }
  }


  @Put('/type/:productTypeId')
  @ApiOperation({
    summary: 'Update a product type',
  })
  @ApiCreatedResponse({
    type: ProductCategory,
    description: 'Product type updated successfully',
    status: 201,
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'This error should be returned when the product type already exists. Check the name.',
    type: String,
  })
  @ApiParam({
    name: 'productTypeId',
    type: String,
    description: 'Used parameter to update by ProductTypeId',
    required: true,
  })
  
  async updateProductType(@Param('productTypeId') productTypeId: string, @Body() productType: ProductType): Promise<ProductType> {
    let productUpdateBody = {productTypeId: productTypeId, productType: productType};
    try {
      const product_type_update = await this.commandsService.request(
        new UpdateProductTypeCommand(productUpdateBody)
      );
      return product_type_update;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Get('/type/:productTypeId')
  @ApiOperation({
    summary: 'Get product type detail',
  })
  @ApiParam({
    name: 'productTypeId',
    type: String,
    description: 'Used parameter to filter by ProductTypeId',
    required: true,
  })
  async getProductTypeDetail(
    @Param('productTypeId') productTypeId?: string,
  ): Promise<ProductType> {
    try {
      return await this.commandsService.request(
        new GetProductTypeDetailCommand(productTypeId),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }
      throw error;
    }
  }

  @Post('/type')
  @ApiOperation({
    summary: 'Create a new product type',
  })
  @ApiCreatedResponse({
    type: ProductCategory,
    description: 'Product type created successfully',
    status: 201,
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'This error should be returned when the product type already exists. Check the name.',
    type: String,
  })
  async createProductType(@Body() productType: CreateProductTypeRequest): Promise<ProductType> {
    try {
      const product_type_created = await this.commandsService.request(
        new CreateProductTypeCommand(productType),
      );
      return product_type_created;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Delete('/type/:productTypeId')
  @ApiOperation({
    summary: 'Delete a product type',
  })
  @ApiParam({
    name: 'productTypeId',
    type: String,
    description: 'Used parameter to delete by ProductTypeId',
    required: true,
  })
  async deleteProductType(
    @Param('productTypeId') productTypeId?: string,
  ) : Promise<any> {
    try {
      const delet =  await this.commandsService.request(
        new DeleteProductTypeCommand(productTypeId),
      );
      return delet;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }
      throw error;
    }
  }

  

  

  @Post('/category')
  @ApiOperation({
    summary: 'Create a new product category',
  })
  @ApiCreatedResponse({
    type: ProductCategory,
    description: 'Product category created successfully',
    status: 201,
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'This error should be returned when the product category already exists. Check the name.',
    type: String,
  })
  async createProductCategory(@Body() productCategory: CreateProductCategoryRequest): Promise<ProductCategory> {
    try {
      const product_category_created = await this.commandsService.request(
        new CreateProductCategoryCommand(productCategory),
      );
      return product_category_created;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  

  @Get('/category/:categoryId')
  @ApiOperation({
    summary: 'Get the category with the relations of brands.',
  })
  @ApiParam({
    name: 'categoryId',
    type: String,
    description: 'Used parameter to filter by CategoryId',
    required: true,
  })
  async getCategoryWithBrands(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductCategory> {
    try {
      return await this.commandsService.request(
        new GetProductCategoryCommand(categoryId),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }
      throw error;
    }
  }

  @Post('/brand')
  @ApiOperation({
    summary: 'Create a new product brand',
  })
  @ApiCreatedResponse({
    type: ProductBrand,
    description: 'Product brand created successfully',
    status: 201,
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'This error should be returned when the product brand already exists. Check the name.',
    type: String,
  })
  async createProductBrand(@Body() productBrand: CreateProductBrandRequest): Promise<ProductBrand> {
    try {
      const product_brand_created = await this.commandsService.request(
        new CreateProductBrandCommand(productBrand),
      );
      return product_brand_created;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }


  @Get('/brand/:brandId')
  @ApiOperation({
    summary: 'Get the brands with the relations of categories.',
  })
  @ApiParam({
    name: 'brandId',
    type: String,
    description: 'Used parameter to filter by BrandId',
    required: true,
  })
  async getBrandWithCategories(
    @Param('brandId') brandId: string,
  ): Promise<ProductBrand> {
    try {
      return await this.commandsService.request(
        new GetProductBrandCommand(brandId),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }
      throw error;
    }
  }

}
