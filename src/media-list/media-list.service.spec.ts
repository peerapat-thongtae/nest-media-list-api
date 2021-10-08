import { Test, TestingModule } from '@nestjs/testing';
import { MediaListService } from './media-list.service';

describe('MediaListService', () => {
  let service: MediaListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaListService],
    }).compile();

    service = module.get<MediaListService>(MediaListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
