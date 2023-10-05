import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class BusinessNotFoundError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The error message.',
    example: 'Business not found with the id 123',
  })
  message: string;

  @ApiProperty({
    description: 'Description of the status code',
    example: 'Not Found',
  })
  error: string;
}
