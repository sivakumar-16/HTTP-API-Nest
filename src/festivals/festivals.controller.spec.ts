import { Test, TestingModule } from '@nestjs/testing';
import { FestivalsController } from './festivals.controller';
import { FestivalsService } from './festivals.service';

describe('FestivalsController', () => {
  let controller: FestivalsController;
  let service: FestivalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FestivalsController],
      providers: [
        {
          provide: FestivalsService,
          useValue: {
            getFestivalsData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FestivalsController>(FestivalsController);
    service = module.get<FestivalsService>(FestivalsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return festival data', async () => {
    const mockData = [
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
    ];

    jest.spyOn(service, 'getFestivalsData').mockResolvedValue(mockData);

    const result = await controller.getFestivals();
    expect(result).toEqual(mockData);
  });
});
