import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaListDto } from './create-media-list.dto';

export class UpdateMediaListDto extends PartialType(CreateMediaListDto) {}
