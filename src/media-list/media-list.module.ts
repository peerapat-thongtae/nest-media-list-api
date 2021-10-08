import { Module } from '@nestjs/common';
import { MediaListService } from './media-list.service';
import { MediaListController } from './media-list.controller';

@Module({
  controllers: [MediaListController],
  providers: [MediaListService]
})
export class MediaListModule {}
