import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  ProductBrand,
  ProductCategory,
  ProductType,
  Product,
} from '@wecon/domain/ps/model';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { QueueEnum } from '@wecon/domain/ps/commands';
import { CreateProductRequest } from '@wecon/domain/ps/requests';
import { CreateProductCategoryRequest } from '@wecon/domain/ps/requests/createProductCategoryRequest';
import { CreateProductBrandRequest } from '@wecon/domain/ps/requests/createProductBrandRequest';
import { Catalog } from '@wecon/domain/shared/requests';
import { LinkCatalog } from '@wecon/domain/shared/responses';
import { CatalogService } from '@wecon/cache';
import { paginateResponse } from '@wecon/domain/shared/paginations/paginationReponse';
import { CreateProductTypeRequest } from '@wecon/domain/ps/requests/createProductTypeRequest';
import { UpdateProductTypeRequest } from '@wecon/domain/ps/requests/updateProductTypeRequest';

@Controller()
export class PsController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    private readonly catalogService: CatalogService,
  ) {}

  @MessagePattern(QueueEnum.createProduct)
  async createProduct(
    @Payload()
    data: CreateProductRequest,
  ): Promise<Product> {
    try {
      return await this.productRepository.save(
        this.productRepository.create(data),
      );
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '23503': {
          status: 'db',
          message: `Unknown product type ${data.product_type_id}`,
          code: 'uknown_business_type',
        },
        '23505': {
          status: 'db',
          message: `Product already exists with the address ${data.name}`,
          code: 'business_already_exists',
        },
        '22P02': {
          status: 'db',
          message: 'Some fields are missed or invalid, please check your data',
          code: 'invalid_data',
        },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.getProducts)
  async getProducts(
    @Payload()
    data: {
      categoryId?: string;
      brandId?: string;
      text?: string;
      page?: number;
      take?: number;
    },
  ): Promise<{statusCode:string,data:Product[], count:Number, currentPage: any, nextPage: any, prevPage: Number, lastPage: number}> {
    const take= Number(data.take) || 10;
    const page= Number(data.page) || 1;
    const skip= (page-1) * take;
    const dataArr =  await this.productRepository.findAndCount({
      select: {
        product_types: {
          name: true,
          id: true,
        },
        product_brand: {
          name: true,
        },
      },
      relations: {
        product_types: true,
        product_brand: true,
      },
      where: {
        ...(data.text && {
          name: Like(`%${data.text}%`),
        }),
        ...(data.categoryId && {
          product_types: { product_category: { id: data.categoryId } },
        }),
        ...(data.brandId && { product_brand: { id: data.brandId } }),
      },
      take:take,
      skip:skip
    });
    const fileteredData = paginateResponse(dataArr, page, take);
    return fileteredData;
  }

  @MessagePattern(QueueEnum.getProductDetail)
  async getProductDetail(
    @Payload()
    productId: string,
  ): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new RpcException({
          status: 'db',
          message: `Product with id not found`,
          code: 'data_not_found',
        });
      }

      return product;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.createProductBrand)
  async createProductBrand(
    @Payload()
    data: CreateProductBrandRequest,
  ): Promise<ProductBrand> {
    try {
      return await this.productBrandRepository.save(
        this.productBrandRepository.create(data),
      );
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '23505': {
          status: 'db',
          message: `Product brand already exists with the address ${data.name}`,
          code: 'business_already_exists',
        },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  } 

  @MessagePattern(QueueEnum.getCategory)
  async getCategoryWithBrands(
    @Payload()
    categoryId: string,
  ): Promise<ProductCategory> {
    try {
      const category = await this.productCategoryRepository.findOne({
        where: {
          id: categoryId,
        },
        select: {
          product_brands: {
            id: true,
            name: true,
          },
        },
        relations: {
          product_brands: true,
        },
      });

      if (!category) {
        throw new RpcException({
          status: 'db',
          message: `Category with id not found`,
          code: 'data_not_found',
        });
      }

      return category;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.getBrand)
  async getBrandWithCategories(
    @Payload()
    brandId: string,
  ): Promise<ProductBrand> {
    console.log(brandId);
    try {
      const brand = await this.productBrandRepository.findOne({
        where: {
          id: brandId,
        },
        select: {
          product_categories: {
            id: true,
            name: true,
          },
        },
        relations: {
          product_categories: true,
        },
      });

      if (!brand) {
        throw new RpcException({
          status: 'db',
          message: `Brand with id not found`,
          code: 'data_not_found',
        });
      }

      return brand;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.createProductCategory)
  async createProductCategory(
    @Payload()
    data: CreateProductCategoryRequest,
  ): Promise<ProductCategory> {
    try {
      return await this.productCategoryRepository.save(
        this.productCategoryRepository.create(data),
      );
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '23505': {
          status: 'db',
          message: `Product category already exists with the address ${data.name}`,
          code: 'business_already_exists',
        },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  } 

  @MessagePattern(QueueEnum.getCategories)
  async getCategories(): Promise<ProductCategory[]> {
    try {
      const categories = await this.productCategoryRepository.find();
      return categories;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.getProductCatalogs)
  async getCatalogs(@Payload() data: Catalog): Promise<LinkCatalog> {
    const { key, version } = data;
    const linkCatalog = this.catalogService.getCatalogLink(
      key,
      version,
      async () => {
        const results = await Promise.all([
          this.productCategoryRepository.find({
            relations: { product_brands: true },
            select: {
              id: true,
              name: true,
              product_brands: { id: true },
            },
          }),
          this.productBrandRepository.find({
            relations: { product_categories: true },
            select: {
              id: true,
              name: true,
              product_categories: { id: true },
            },
          }),
          this.productTypeRepository.find({
            select: {
              id: true,
              name: true,
              product_category_id: true,
            },
          }),
        ]);
        return {
          productCategories: results[0],
          productBrands: results[1],
          productTypes: results[2],
        };
      },
    );

    return linkCatalog;
  }

  @MessagePattern(QueueEnum.createProductType)
  async createProductType(
    @Payload()
    data: CreateProductTypeRequest,
  ): Promise<ProductType> {
    try {
      return await this.productTypeRepository.save(
        this.productTypeRepository.create(data),
      );
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '23505': {
          status: 'db',
          message: `Product type already exists with the name ${data.name}`,
          code: 'business_already_exists',
        },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.getProductTypes)
  async getProductTypes(
    @Payload()
    data: {
      name?: string;
      page?: number;
      take?: number;
    },
  ): Promise<{statusCode:string,data:ProductType[], count:Number, currentPage: any, nextPage: any, prevPage: Number, lastPage: number}> {
    const take= Number(data.take) || 10;
    const page= Number(data.page) || 1;
    const skip= (page-1) * take;
    const dataArr =  await this.productTypeRepository.findAndCount({
      where: {
        ...(data.name && {
          name: Like(`%${data.name}%`),
        }),
      },
      take:take,
      skip:skip
    });
    const fileteredData = paginateResponse(dataArr, page, take);
    return fileteredData;
  }

  @MessagePattern(QueueEnum.getProductTypeDetail)
  async getProductTypeDetail(
    @Payload()
    productTypeId: string,
  ): Promise<ProductType> {
    try {
      const product_type = await this.productTypeRepository.findOne({
        where: {
          id: productTypeId,
        },
      });

      if (!product_type) {
        throw new RpcException({
          status: 'db',
          message: `Product type with id not found`,
          code: 'data_not_found',
        });
      }

      return product_type;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.updateProductType)
  async updateProductDetail(
    @Payload()
    data: UpdateProductTypeRequest,
  ): Promise<any> {
    try {
      const productType = await this.productTypeRepository.findOne({
        where: {
          id: data.productTypeId,
        },
      });
      if (!productType) {
        throw new RpcException({
          status: 'db',
          message: `Product Type with id not found`,
          code: 'data_not_found',
        });
      }
      await this.productTypeRepository.update(data.productTypeId, {...data.productType.name && { name: data.productType.name}});
      let res = {statusCode:'Updated a Product type sucessufully!', updatedId: data.productTypeId};
      return res;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }

  @MessagePattern(QueueEnum.delProductType)
  async delProductType(
    @Payload()
    productTypeId: string,
  ): Promise<{statusCode:string, deletedId:string}> {
    try {
      const product = await this.productTypeRepository.findOne({
        where: {
          id: productTypeId,
        },
      });

      if (!product) {
        throw new RpcException({
          status: 'db',
          message: `Product Type with id not found`,
          code: 'data_not_found',
        });
      }

      await this.productTypeRepository.delete(productTypeId);
      let res = {statusCode:"Product type was deleted!", deletedId:productTypeId}
      return res;
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
      };

      if (err.code in errorMessages) {
        throw new RpcException({
          status: errorMessages[err.code].status,
          message: errorMessages[err.code].message,
          code: errorMessages[err.code].code,
        });
      }

      throw err;
    }
  }


}
