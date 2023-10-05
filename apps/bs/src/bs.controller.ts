import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Business, BusinessType } from '@wecon/domain/bs/model';
import { Repository } from 'typeorm';
import { CatalogService } from '@wecon/cache';
import { Catalog } from '@wecon/domain';
import { QueueEnum } from '@wecon/domain/bs/commands';
import { QueueEnum as GeneralQueueEnum } from '@wecon/domain/shared/commands';
import {
  BusinessCategory,
  BusinessProduct,
  BusinessTypeProductCategory,
  BusinessTypeSuggested,
} from '@wecon/domain/bs/model';
import {
  BusinessSuggestedTypeRequest,
  CreateBusinessRequest,
  LoadProductsForBusinessRequest,
} from '@wecon/domain/bs/requests';
import { CommandsService } from '@wecon/events';
import { GetProductsCommand } from '@wecon/domain/ps/commands';
import { GetProductsRequest } from '@wecon/domain/ps/requests/GetProductsRequest';

@Controller()
export class BsController {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(BusinessTypeSuggested)
    private readonly businessSuggestedTypeRepository: Repository<BusinessTypeSuggested>,
    @InjectRepository(BusinessType)
    private readonly businessTypeRepository: Repository<BusinessType>,
    @InjectRepository(BusinessCategory)
    private readonly businessCategoryRepository: Repository<BusinessCategory>,
    @InjectRepository(BusinessTypeProductCategory)
    private readonly businessTypeProductCategoryRepository: Repository<BusinessTypeProductCategory>,
    @InjectRepository(BusinessProduct)
    private readonly businessProductRepository: Repository<BusinessProduct>,
    private readonly catalogService: CatalogService,
    private readonly commandsService: CommandsService,
  ) {}

  @MessagePattern(QueueEnum.createBusiness)
  async createBusiness(
    @Payload()
    data: CreateBusinessRequest,
  ): Promise<Business> {
    try {
      return await this.businessRepository.save(
        this.businessRepository.create(data),
      );
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '23503': {
          status: 'db',
          message: `Unknown business type ${data.business_type}`,
          code: 'uknown_business_type',
        },
        '23505': {
          status: 'db',
          message: `Business already exists with the address ${data.address}`,
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

  @MessagePattern(QueueEnum.getBusiness)
  async getBusinessById(
    @Payload()
    id: string,
  ): Promise<Business> {
    try {
      const business = await this.businessRepository.findOneBy({ id: id });

      if (!business) {
        throw new RpcException({
          status: 'db',
          message: `Business with id not found`,
          code: 'data_not_found',
        });
      }

      return business;
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

  @MessagePattern(QueueEnum.createSuggestedType)
  async createSuggestedType(
    @Payload()
    data: BusinessSuggestedTypeRequest,
  ): Promise<BusinessTypeSuggested> {
    try {
      return await this.businessSuggestedTypeRepository.save(
        this.businessSuggestedTypeRepository.create(data),
      );
    } catch (err) {
      const errorMessages: Record<
        string,
        { status: string; message: string; code: string }
      > = {
        '23505': {
          status: 'db',
          message: 'Business address already exists',
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

  @MessagePattern(GeneralQueueEnum.getCatalogbasics)
  async getCatalogueBasics(
    @Payload() data: { key: string; version?: number },
  ): Promise<Catalog> {
    const linkCatalog = this.catalogService.getCatalogLink(
      'basics',
      data.version,
      async () => {
        const data = await Promise.all([
          this.businessTypeRepository.find({
            select: { id: true, name: true, business_category_id: true },
          }),
          this.businessCategoryRepository.find({
            select: { id: true, name: true },
          }),
        ]);
        return {
          businessTypes: data[0],
          businessCategories: data[1],
        };
      },
    );

    return linkCatalog;
  }

  @MessagePattern(QueueEnum.getCategoriesByBusiness)
  async getProductsCategoriesByBusinessId(
    @Payload() businessId: string,
  ): Promise<string[]> {
    try {
      const business = await this.businessRepository.findBy({
        id: businessId,
      });

      if (!business[0]) {
        throw new RpcException({
          status: 'db',
          message: `Business with id not found`,
          code: 'data_not_found',
        });
      }

      const productCategories =
        await this.businessTypeProductCategoryRepository.find({
          where: {
            business_type_id: business[0].business_type_id,
          },
          select: {
            product_category_id: true,
          },
        });

      if (!productCategories.length) {
        throw new RpcException({
          status: 'db',
          message: `There are no categories for this business type`,
          code: 'data_not_found',
        });
      }

      return productCategories.map((element) => element.product_category_id);
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

  @MessagePattern(QueueEnum.loadProductsForBusiness)
  async loadProductsForBusiness(
    @Payload()
    data: LoadProductsForBusinessRequest,
  ): Promise<number> {
    let totalCount = 0;
    const insertProducts = async (productIds: string[]) => {
      if (productIds != null) {
        const insertResult = await this.businessProductRepository
          .createQueryBuilder()
          .insert()
          .values(
            productIds.map((productId) => ({
              business_id: data.businessId,
              product_id: productId,
            })),
          )
          .orIgnore()
          .execute();
        if (insertResult.raw) totalCount += insertResult.raw.length;
      }
    };
    const getAndInsertProducts = async (request: GetProductsRequest) => {
      const productResult = await this.commandsService.request(
        new GetProductsCommand(request),
      );
      if (productResult != null) {
        insertProducts(productResult.map((product) => product.id));
      }
    };

    try {
      if (data.productCategories != null) {
        for (const categoryId of data.productCategories) {
          await getAndInsertProducts({
            categoryId: categoryId,
            brandId: '',
            text: '',
          });
        }
      }

      if (data.productBrandCategories != null) {
        for (const categoryBrand of data.productBrandCategories) {
          await getAndInsertProducts({
            categoryId: categoryBrand.categoryId,
            brandId: categoryBrand.brandId,
            text: '',
          });
        }
      }

      if (data.products != null) {
        await insertProducts(data.products);
      }

      return totalCount;
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
