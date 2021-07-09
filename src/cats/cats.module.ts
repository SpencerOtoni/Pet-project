import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService, CatsResolver],
  exports:[CatsService]
})
export class CatsModule {}
