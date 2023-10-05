import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.BAD_REQUEST,
  })
  code: HttpStatus;

  @ApiProperty({
    description: 'The error message.',
    example: 'Some required fields are missing, please check your data',
  })
  message: string;

  @ApiProperty({
    description: 'Description of the status code',
    example: 'db',
  })
  status: string;
}
