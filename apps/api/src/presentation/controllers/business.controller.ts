import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CommandsService } from '@wecon/events';
import { ErrorCodeEnum } from '../errors/ErrorCodeEnum';
import { CreateBusinessRequest } from '@wecon/domain/bs/requests/createBusinessRequest';
import { CreateBusinessCommand } from '@wecon/domain/bs/commands/CreateBusinessCommand';
import { CreateBusinessSuggestedTypeCommand } from '@wecon/domain/bs/commands/CreateBusinessSuggestedTypeCommand';
import { GetBusinessCommand } from '@wecon/domain/bs/commands/GetBusinessCommand';
import { GetCategoriesByBusinessIdCommand } from '@wecon/domain/bs/commands/GetCategoriesByBusinessIdCommand';
import { LoadProductsForBusinessCommand } from '@wecon/domain/bs/commands/LoadProductsForBusinessCommand';
import { LoadProductsForBusinessRequest } from '@wecon/domain/bs/requests/loadProductsForBusinessRequest';
import { Business, BusinessProduct } from '@wecon/domain/bs/model';

@ApiTags('Business')
@Controller('business')
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
})
@ApiNoContentResponse({
  status: 204,
  description: 'No content found with the specify params',
})
export class BusinessController {
  constructor(private readonly commandsService: CommandsService) {}
  @Post()
  @ApiOperation({
    summary: 'Create a new business',
  })
  @ApiCreatedResponse({
    type: Business,
    description: 'Business created successfully',
    status: 201,
  })
  @ApiConflictResponse({
    status: 409,
    description:
      'This error should be returned when the business already exists. Check the address.',
    type: String,
  })
  @ApiNotFoundResponse({
    status: 432,
    description:
      'This error should be returned when the business type is not found. Check the UUID.',
    type: String,
  })
  async create(@Body() business: CreateBusinessRequest): Promise<Business> {
    try {
      const businessCreated = await this.commandsService.request(
        new CreateBusinessCommand(business),
      );

      if (business.business_type_suggested) {
        this.commandsService.request(
          new CreateBusinessSuggestedTypeCommand({
            name: business.business_type_suggested,
            business: businessCreated.id,
          }),
        );
      }

      return businessCreated;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Returns a business by id',
  })
  @ApiOkResponse({
    type: Business,
    description: 'Business returned successfully',
  })
  async getBusinessById(@Param('id') id: string): Promise<Business> {
    try {
      return await this.commandsService.request(new GetBusinessCommand(id));
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Get(':id/products_categories')
  @ApiOperation({
    summary: 'Returns a business products categories based by business ID.',
  })
  @ApiOkResponse({
    isArray: true,
    type: String,
    description: 'Business products categories returned successfully',
  })
  async getProductsCategoriesByBusinessId(
    @Param('id') id: string,
  ): Promise<[string]> {
    try {
      return await this.commandsService.request(
        new GetCategoriesByBusinessIdCommand(id),
      );
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }

  @Post(':id/product/load')
  @ApiOperation({
    summary: 'Load products for a business',
  })
  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'Id for the business to add the products',
    example: '901b3a4b-4ea6-4fab-a328-f72fc4010cec',
  })
  @ApiCreatedResponse({
    description: 'Products sucessfully loaded',
    type: 'number',
  })
  async loadProductsForBusiness(
    @Param('id') id: string,
    @Body() products_data: LoadProductsForBusinessRequest,
  ): Promise<number> {
    products_data.businessId = id;
    try {
      const result = await this.commandsService.request(
        new LoadProductsForBusinessCommand(products_data),
      );
      return result;
    } catch (error) {
      if (error?.code in ErrorCodeEnum) {
        throw new HttpException(error.message, ErrorCodeEnum[`${error.code}`]);
      }

      throw error;
    }
  }
}
