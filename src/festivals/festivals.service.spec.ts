import { Test, TestingModule } from '@nestjs/testing';
import { FestivalsService } from './festivals.service';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

describe('FestivalsService', () => {
  let service: FestivalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FestivalsService],
    }).compile();

    service = module.get<FestivalsService>(FestivalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read and transform festival data correctly', async () => {
    const mockData = JSON.stringify([
      {
        name: 'Small Night In',
        bands: [
          {
            name: 'Squint-281',
            recordLabel: 'Outerscope',
          },
        ],
      },
      {
        name: 'Trainerella',
        bands: [
          {
            name: 'Wild Antelope',
            recordLabel: 'Still Bottom Records',
          },
        ],
      },
    ]);

    (fs.readFile as jest.Mock).mockResolvedValue(mockData);

    const result = await service.getFestivalsData();

    expect(result).toEqual([
      {
        label: 'Outerscope',
        bands: [
          {
            name: 'Squint-281',
            festivals: [
              {
                name: 'Small Night In',
              },
            ],
          },
        ],
      },
      {
        label: 'Still Bottom Records',
        bands: [
          {
            name: 'Wild Antelope',
            festivals: [
              {
                name: 'Trainerella',
              },
            ],
          },
        ],
      },
    ]);

    // Ensure the data is sorted by label
    expect(result[0].label).toBe('Outerscope');
    expect(result[1].label).toBe('Still Bottom Records');
  });

  it('should throw an exception if reading file fails', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

    await expect(service.getFestivalsData()).rejects.toThrow(
      'Failed to read or transform festival data from local file',
    );
  });
});
