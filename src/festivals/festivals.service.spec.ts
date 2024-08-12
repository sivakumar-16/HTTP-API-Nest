import { Test, TestingModule } from '@nestjs/testing';
import { FestivalsService } from './festivals.service';
import axios from 'axios';
import { HttpException } from '@nestjs/common';

jest.mock('axios');

describe('FestivalsService', () => {
  let service: FestivalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FestivalsService],
    }).compile();

    service = module.get<FestivalsService>(FestivalsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return transformed and sorted data when the API call is successful', async () => {
    const mockApiResponse = [
      {
        name: 'Festival A',
        bands: [
          { name: 'Band 1', recordLabel: 'Label 1' },
          { name: 'Band 2', recordLabel: 'Label 2' },
        ],
      },
      {
        name: 'Festival B',
        bands: [
          { name: 'Band 3', recordLabel: 'Label 1' },
          { name: 'Band 4', recordLabel: 'Label 3' },
        ],
      },
    ];

    const expectedTransformedData = [
      {
        label: 'Label 1',
        bands: [
          { name: 'Band 1', festivals: [{ name: 'Festival A' }] },
          { name: 'Band 3', festivals: [{ name: 'Festival B' }] },
        ],
      },
      {
        label: 'Label 2',
        bands: [{ name: 'Band 2', festivals: [{ name: 'Festival A' }] }],
      },
      {
        label: 'Label 3',
        bands: [{ name: 'Band 4', festivals: [{ name: 'Festival B' }] }],
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const result = await service.getFestivalsData();
    expect(result).toEqual(expectedTransformedData);
  });

  it('should return cached data when the API call fails', async () => {
    const cachedData = [
      {
        label: 'Cached Label',
        bands: [{ name: 'Cached Band', festivals: [{ name: 'Cached Festival' }] }],
      },
    ];

    service['cachedData'] = cachedData; // Directly setting cached data for the test

    (axios.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });

    const result = await service.getFestivalsData();
    expect(result).toEqual(cachedData);
  });

  it('should throw an error if both API call fails and no cached data is available', async () => {
    service['cachedData'] = []; // Ensure no cached data is available

    (axios.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });

    await expect(service.getFestivalsData()).rejects.toThrow(
      new HttpException('Failed to fetch festival data and no cached data is available', 500),
    );
  });
});
