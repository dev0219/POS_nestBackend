import { Test, TestingModule } from '@nestjs/testing';
import { PsController } from './ps.controller';
import { Repository } from 'typeorm';
import {
  IEntity,
  Product,
  ProductBrand,
  ProductCategory,
  ProductType,
} from '@wecon/domain';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

describe('PsController', () => {
  let psController: PsController;
  let productRepository: Repository<Product>;
  let productTypeRepository: Repository<ProductType>;
  let productBrandRepository: Repository<ProductBrand>;
  let productCategoryRepository: Repository<ProductCategory>;

  const mockProductRepository = {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockProductBrandRepository = {
    find: jest.fn(),
  };

  const mockProductCategoryRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PsController],
      providers: [
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(ProductType),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProductBrand),
          useClass: Repository,
          useValue: mockProductBrandRepository,
        },
        {
          provide: getRepositoryToken(ProductCategory),
          useClass: Repository,
          useValue: mockProductCategoryRepository,
        },
      ],
    }).compile();

    productRepository = app.get(getRepositoryToken(Product));
    productTypeRepository = app.get(getRepositoryToken(ProductType));
    productBrandRepository = app.get(getRepositoryToken(ProductBrand));
    productCategoryRepository = app.get(getRepositoryToken(ProductCategory));
    psController = app.get<PsController>(PsController);
  });
  const mockProduct: Product = {
    id: 'asd',
    updatedAt: undefined,
    updatedBy: '',
    equals(entity: IEntity): boolean {
      return false;
    },
    name: 'Product 1',
    barcode: '123456',
    short_name: 'P1',
    measure: 1,
    description: 'Test product 1',
    properties: {
      en: {
        label1: 'value1',
        label2: 'value2',
      },
    },
    product_brand: Promise.resolve({} as ProductBrand),
    product_types: Promise.resolve([] as ProductType[]),
  };

  describe('getProducts', () => {
    it('should return products related to categoryId', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([mockProduct]);

      const result = await psController.getProducts({
        categoryId: 'mockCategoryId',
      });

      expect(result).toEqual([mockProduct]);
    });

    it('should return products related to brandId', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([mockProduct]);

      const result = await psController.getProducts({
        brandId: 'mockBrandId',
      });

      expect(result).toEqual([mockProduct]);
    });

    it('should return a product with specifyId', async function () {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      const result = await psController.getProductDetail('mockProductId');

      expect(result).toEqual(mockProduct);
    });

    it('should return exception when theres no product found', async function () {
      const productId = '1155371ce-0455-447f-8b43-nonexistent';

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

      await expect(psController.getProductDetail(productId)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('getCategoryWithBrands', () => {
    const mockCategory: ProductCategory = {
      id: 'categoryId',
      updatedAt: undefined,
      updatedBy: '',
      equals(entity: IEntity): boolean {
        return false;
      },
      name: 'Category 1',
      product_brands: Promise.resolve([] as ProductBrand[]),
      product_types: Promise.resolve([]),
      products_count: 0,
    };
    it('should return product brands related to category', async () => {
      jest
        .spyOn(productCategoryRepository, 'find')
        .mockResolvedValue([mockCategory]);

      const result = await psController.getCategoryWithBrands('categoryId');

      expect(result).toEqual([mockCategory]);
    });
    it('should return exception when category doesnt found', async function () {
      const categoryId = '1155371ce-0455-447f-8b43-nonexistent';

      jest
        .spyOn(productCategoryRepository, 'find')
        .mockResolvedValue(undefined);

      await expect(
        psController.getCategoryWithBrands(categoryId),
      ).rejects.toThrow(RpcException);
    });
  });

  describe('getBrandWithCategories', () => {
    const mockBrand: ProductBrand = {
      id: 'brandId',
      updatedAt: undefined,
      updatedBy: '',
      equals(entity: IEntity): boolean {
        return false;
      },
      name: 'Category 1',
      products_count: 0,
      product_categories: Promise.resolve([] as ProductCategory[]),
    };
    it('should return product categories related to brand', async () => {
      jest.spyOn(productBrandRepository, 'find').mockResolvedValue([mockBrand]);

      const result = await psController.getBrandWithCategories('brandId');

      expect(result).toEqual([mockBrand]);
    });
    it('should return exception when brand doesnt found', async function () {
      const brandId = '1155371ce-0455-447f-8b43-nonexistent';

      jest.spyOn(productBrandRepository, 'find').mockResolvedValue(undefined);

      await expect(
        psController.getBrandWithCategories(brandId),
      ).rejects.toThrow(RpcException);
    });
  });
});
