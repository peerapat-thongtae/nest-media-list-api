import { Test, TestingModule } from '@nestjs/testing';
import { MediaListController } from './media-list.controller';
import { MediaListService } from './media-list.service';

describe('MediaListController', () => {
  let controller: MediaListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaListController],
      providers: [MediaListService],
    }).compile();

    controller = module.get<MediaListController>(MediaListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
