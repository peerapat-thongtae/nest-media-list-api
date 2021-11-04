import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaDto } from './dto/media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private readonly mediasRepository: Repository<Media>,
  ) {}
  async create(createMediaDto: CreateMediaDto) {
    try {
      const findMedia = await this.findOne(createMediaDto.id);
      if (findMedia) {
        return new MediaDto(findMedia);
      }
      const media = new Media();
      media.id = createMediaDto.id;
      media.mediaName = createMediaDto.mediaName;
      media.mediaType = createMediaDto.mediaType;

      const mediaData = await this.mediasRepository.save(media);
      return new MediaDto(mediaData);
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all medias`;
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findOne(id);
    return media;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
