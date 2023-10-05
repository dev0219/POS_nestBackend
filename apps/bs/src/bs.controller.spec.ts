import { Test, TestingModule } from '@nestjs/testing';
import { BsController } from './bs.controller';
import { Repository } from 'typeorm';
import {
  Business,
  BusinessCategory,
  BusinessType,
  BusinessTypeProductCategory,
  BusinessTypeSuggested,
  IEntity,
  ProductCategory,
  ProductType,
  BusinessProduct,
} from '@wecon/domain';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { CacheService } from '@wecon/cache';
import { RemoteStorageService } from '@wecon/remote-storage';

describe('BsController', () => {
  let bsController: BsController;
  let businessRepository: Repository<Business>;
  let businessProductRepository: Repository<BusinessProduct>;
  let businessTypeRepository: Repository<BusinessType>;
  let productTypeRepository: Repository<ProductType>;
  let businessCategoryRepository: Repository<BusinessCategory>;
  let productCategoryRepository: Repository<ProductCategory>;
  let businessSuggestedTypeRepository: Repository<BusinessTypeSuggested>;
  let businessTypeProductCategoryRepository: Repository<BusinessTypeProductCategory>;
  let cacheService: CacheService;
  let remoteStorageService: RemoteStorageService;

  const mockBusinessRepository = {
    save: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
  };

  const mockBusinessProductRepository = {
    save: jest.fn(),
    create: jest.fn(),
    findBy: jest.fn(),
    findOne: jest.fn(),
  };

  const mockBusinessSuggestedTypeRepository = {
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BsController],
      providers: [
        CacheService,
        RemoteStorageService,
        {
          provide: getRepositoryToken(ProductType),
          useClass: Repository, // Mock the repository class
        },
        {
          provide: getRepositoryToken(Business),
          useValue: mockBusinessRepository,
        },
        {
          provide: getRepositoryToken(BusinessProduct),
          useValue: mockBusinessProductRepository,
        },
        {
          provide: getRepositoryToken(BusinessTypeSuggested),
          useValue: mockBusinessSuggestedTypeRepository,
        },
        {
          provide: getRepositoryToken(BusinessType),
          useClass: Repository, // Mock the repository class
        },
        {
          provide: getRepositoryToken(BusinessCategory),
          useClass: Repository, // Mock the repository class
        },
        {
          provide: getRepositoryToken(ProductCategory),
          useClass: Repository, // Mock the repository class
        },
        {
          provide: getRepositoryToken(BusinessTypeProductCategory),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    bsController = app.get<BsController>(BsController);

    cacheService = app.get<CacheService>(CacheService);
    remoteStorageService = app.get<RemoteStorageService>(RemoteStorageService);

    businessRepository = app.get<Repository<Business>>(
      getRepositoryToken(Business),
    );

    businessProductRepository = app.get<Repository<BusinessProduct>>(
      getRepositoryToken(BusinessProduct),
    );

    productTypeRepository = app.get<Repository<ProductType>>(
      getRepositoryToken(ProductType),
    );

    businessSuggestedTypeRepository = app.get<
      Repository<BusinessTypeSuggested>
    >(getRepositoryToken(BusinessTypeSuggested));

    businessTypeRepository = app.get<Repository<BusinessType>>(
      getRepositoryToken(BusinessType),
    );

    businessCategoryRepository = app.get<Repository<BusinessCategory>>(
      getRepositoryToken(BusinessCategory),
    );

    productCategoryRepository = app.get<Repository<ProductCategory>>(
      getRepositoryToken(ProductCategory),
    );

    businessTypeProductCategoryRepository = app.get<
      Repository<BusinessTypeProductCategory>
    >(getRepositoryToken(BusinessTypeProductCategory));
  });

  describe('createBusiness', () => {
    it('should create a new business', async () => {
      const createBusinessData = {
        name: 'Test Business',
        address: '123 Test Street',
        gps: { type: 'Point', coordinates: [0, 0] },
        phone: '123-456-7890',
        business_type: Promise.resolve({} as BusinessType),
      };

      const createdBusiness = { id: 1, ...createBusinessData };

      mockBusinessRepository.create.mockReturnValue(createBusinessData);
      mockBusinessRepository.save.mockResolvedValue(createdBusiness);

      const result = await bsController.createBusiness({
        name: 'Test Business',
        address: '123 Test Street',
        gps: { type: 'Point', coordinates: [0, 0] },
        phone: '123-456-7890',
        business_type: Promise.resolve({} as BusinessType),
      });

      expect(result).toEqual(createdBusiness);
      expect(mockBusinessRepository.create).toHaveBeenCalledWith(
        createBusinessData,
      );
      expect(mockBusinessRepository.save).toHaveBeenCalledWith(
        createBusinessData,
      );
    });

    it('should handle known database errors', async () => {
      const createBusinessData = {
        name: 'Test Business',
        address: '123 Test Street',
        gps: { type: 'Point', coordinates: [0, 0] },
        phone: '123-456-7890',
        business_type: Promise.resolve({} as BusinessType),
      };

      const knownErrorCodes = ['23503', '23505', '22P02'];

      for (const errorCode of knownErrorCodes) {
        const mockError = Object.assign(new Error(), { code: errorCode });

        mockBusinessRepository.create.mockReturnValue(createBusinessData);
        mockBusinessRepository.save.mockRejectedValue(mockError);

        await expect(
          bsController.createBusiness({
            name: 'Test Business',
            address: '123 Test Street',
            gps: { type: 'Point', coordinates: [0, 0] },
            phone: '123-456-7890',
            business_type: Promise.resolve({} as BusinessType),
          }),
        ).rejects.toThrow(RpcException);
      }
    });

    it('should handle other database errors', async () => {
      const createBusinessData = {
        name: 'Test Business',
        address: '123 Test Street',
        gps: { type: 'Point', coordinates: [0, 0] },
        phone: '123-456-7890',
        business_type: Promise.resolve({} as BusinessType),
      };

      const mockError = new RpcException('Some other database error');

      mockBusinessRepository.create.mockReturnValue(createBusinessData);
      mockBusinessRepository.save.mockRejectedValue(mockError);

      await expect(
        bsController.createBusiness({
          name: 'Test Business',
          address: '123 Test Street',
          gps: { type: 'Point', coordinates: [0, 0] },
          phone: '123-456-7890',
          business_type: Promise.resolve({} as BusinessType),
        }),
      ).rejects.toThrow(RpcException);
    });
  });

  describe('getBusinessById', () => {
    it('should get a business by id', async () => {
      const businessId = '1155371ce-0455-447f-8b43-66c07e9acc7a';
      const mockBusiness = { id: businessId, name: 'Test Business' };

      mockBusinessRepository.findOneBy.mockResolvedValue(mockBusiness);

      const result = await bsController.getBusinessById(businessId);

      console.log(result);

      expect(result).toEqual(mockBusiness);
      expect(mockBusinessRepository.findOneBy).toHaveBeenCalledWith({
        id: businessId,
      });
    });

    it('should throw RpcException if business is not found', async () => {
      const businessId = '1155371ce-0455-447f-8b43-nonexistent';

      mockBusinessRepository.findOneBy.mockResolvedValue(undefined);

      await expect(bsController.getBusinessById(businessId)).rejects.toThrow(
        RpcException,
      );
      expect(mockBusinessRepository.findOneBy).toHaveBeenCalledWith({
        id: businessId,
      });
    });
  });

  describe('getProductsCategoriesByBusinessId', () => {
    it('should return product categories for a valid business ID', async () => {
      const businessId = 'businessId';
      const businessTypeId = 'bussinesTypeId';

      const mockBusiness: Business = {
        address: '',
        gps: undefined,
        name: '',
        phone: '',
        updatedAt: undefined,
        updatedBy: '',
        equals(entity: IEntity): boolean {
          return false;
        },
        id: 'validBusinessId',
        business_type: Promise.resolve({
          id: 'businessTypeId',
        } as BusinessType),
      };

      businessRepository.findBy = jest.fn().mockResolvedValue(mockBusiness);

      const productCategoryMock = { product_category_id: 'productCategoryId' };
      businessTypeProductCategoryRepository.find = jest
        .fn()
        .mockResolvedValue([productCategoryMock]);

      const result = await bsController.getProductsCategoriesByBusinessId(
        businessId,
      );

      expect(result).toEqual([productCategoryMock.product_category_id]);
    });

    it('should throw RpcException for invalid business ID', async () => {
      jest.spyOn(businessRepository, 'findOne').mockResolvedValue(null);

      await expect(
        bsController.getProductsCategoriesByBusinessId('invalidBusinessId'),
      ).rejects.toThrowError(RpcException);
    });

    it('should throw an RpcException with data_not_found code when productCategories length is zero', async () => {
      const businessId = 'some-business-id';

      businessRepository.findBy = jest
        .fn()
        .mockResolvedValue({ business_type_id: 'some-business-type-id' });

      businessTypeProductCategoryRepository.find = jest
        .fn()
        .mockResolvedValue([]);

      try {
        await bsController.getProductsCategoriesByBusinessId(businessId);
      } catch (error) {
        expect(error).toBeInstanceOf(RpcException);
        expect(error.message).toBe(
          'There are no categories for this business type',
        );
        expect(error.error.code).toBe('data_not_found');
      }
    });
  });

  describe('loadProductsOnBusiness', () => {
    it('should create data on BusinessProducts table', async () => {
      const businessId = 'business123';
      const products = ['product1', 'product2'];

      businessProductRepository.findBy = jest.fn().mockResolvedValue([]);
      businessProductRepository.save = jest.fn().mockResolvedValue([]);

      const result = await bsController.loadProductsForBusiness({
        businessId,
        products_data: { products },
      });

      expect(result).toEqual([[], []]);
      expect(businessProductRepository.findBy).toHaveBeenCalledWith({
        business_id: businessId,
        product_id: expect.any(String), // Check any product ID
      });
      expect(businessProductRepository.save).toHaveBeenCalledTimes(
        products.length,
      );
    });

    it('should handle database errors', async () => {
      businessProductRepository.findBy = jest.fn().mockRejectedValue({
        code: '22P02',
      });

      try {
        await bsController.loadProductsForBusiness({
          businessId: 'business123',
          products_data: { products: ['product1'] },
        });
      } catch (error) {
        expect(error.message).toBe('Invalid id');
      }
    });
  });
});
