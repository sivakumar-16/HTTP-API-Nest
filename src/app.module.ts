import { Module, MiddlewareConsumer } from '@nestjs/common';
import { FestivalsModule } from './festivals/festivals.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [FestivalsModule],
})
export class AppModule {
  configure(consumers: MiddlewareConsumer) {
    // eslint-disable-next-line prettier/prettier
    consumers.apply(LoggerMiddleware).forRoutes('*')
  }
}
