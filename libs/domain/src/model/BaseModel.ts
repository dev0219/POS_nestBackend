import { ApiProperty } from '@nestjs/swagger';
import { IEntity } from '@wecon/domain';

export abstract class BaseModel {
  @ApiProperty({ uniqueItems: true, required: false })
  id: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;

  equals(entity: IEntity): boolean {
    if (!(entity instanceof BaseModel)) return false;

    return this.id === entity.id;
  }
}
