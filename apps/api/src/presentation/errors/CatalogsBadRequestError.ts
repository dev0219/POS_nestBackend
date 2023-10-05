import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class CatalogsBadRequestError {
  @ApiProperty({
    description: 'The error message.',
    example: ['catalogs.0.version should not be empty'],
  })
  message: [string];

  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'Description of the status code',
    example: 'Bad Request',
  })
  error: string;
}
