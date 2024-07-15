import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import History from '@entities/History';

import HistoryRepositorie from '@model/history/repositorie/HistoryRepositorie';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryRepositorie],
  exports: [HistoryRepositorie],
})
export class HistoryModule {}
