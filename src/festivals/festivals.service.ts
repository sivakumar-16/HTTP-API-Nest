import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FestivalsService {
  private readonly apiUrl =
    'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals';
  private cachedData: any[] = [];

  async getFestivalsData(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl);
      const festivals = response.data;
      const transformedData = this.transformAndSortData(festivals);

      this.cachedData = transformedData;

      return transformedData;
    } catch (error) {
      if (this.cachedData.length > 0) {
        return this.cachedData;
      } else {
        throw new HttpException(
          'Failed to fetch festival data and no cached data is available',
          error.response?.status || 500,
        );
      }
    }
  }

  private transformAndSortData(festivals: any[]): any[] {
    const result: any = {};

    festivals.forEach((festival) => {
      festival.bands.forEach((band: any) => {
        const recordLabel = band.recordLabel || 'Unknown Label';
        if (!result[recordLabel]) {
          result[recordLabel] = [];
        }

        result[recordLabel].push({
          name: band.name,
          festivals: [{ name: festival.name }],
        });
      });
    });

    const sortedData = Object.keys(result)
      .sort((a, b) => a.localeCompare(b))
      .map((label) => ({
        label,
        bands: result[label],
      }));

    return sortedData;
  }
}
