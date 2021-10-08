import { Injectable } from '@nestjs/common';
import { CreateMediaListDto } from './dto/create-media-list.dto';
import { UpdateMediaListDto } from './dto/update-media-list.dto';

@Injectable()
export class MediaListService {
  create(createMediaListDto: CreateMediaListDto) {
    return 'This action adds a new mediaList';
  }

  findAll() {
    return `This action returns all mediaList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mediaList`;
  }

  update(id: number, updateMediaListDto: UpdateMediaListDto) {
    return `This action updates a #${id} mediaList`;
  }

  remove(id: number) {
    return `This action removes a #${id} mediaList`;
  }
}
