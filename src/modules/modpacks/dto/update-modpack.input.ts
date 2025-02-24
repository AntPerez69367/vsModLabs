import { CreateModpackInput } from './create-modpack.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateModpackInput extends PartialType(CreateModpackInput) {}
