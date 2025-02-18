import { CreateModDto } from './create-mod.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateModDto extends PartialType(CreateModDto) {
  id: number;
}
