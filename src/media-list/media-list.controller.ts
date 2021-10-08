import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaListService } from './media-list.service';
import { CreateMediaListDto } from './dto/create-media-list.dto';
import { UpdateMediaListDto } from './dto/update-media-list.dto';

@Controller('media-list')
export class MediaListController {
  constructor(private readonly mediaListService: MediaListService) {}

  @Post()
  create(@Body() createMediaListDto: CreateMediaListDto) {
    return this.mediaListService.create(createMediaListDto);
  }

  @Get()
  findAll() {
    return this.mediaListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaListDto: UpdateMediaListDto) {
    return this.mediaListService.update(+id, updateMediaListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaListService.remove(+id);
  }
}
