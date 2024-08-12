import { Injectable, HttpException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FestivalsService {
  private readonly dataFilePath = path.resolve(__dirname, '../../data.json');

  async getFestivalsData(): Promise<any> {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      const jsonData = JSON.parse(data);

      // Transform data to the desired format
      const transformedData = jsonData.map((festival: any) => {
        return {
          label: festival.bands[0]?.recordLabel || 'Unknown Label',
          bands: festival.bands.map((band: any) => ({
            name: band.name,
            festivals: [
              {
                name: festival.name,
              },
            ],
          })),
        };
      });

      // Sort by the "label" field
      transformedData.sort((a: any, b: any) => a.label.localeCompare(b.label));

      return transformedData;
    } catch (error) {
      throw new HttpException(
        'Failed to read or transform festival data from local file',
        500,
      );
    }
  }
}
