import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/entities/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class Repo {
  public constructor(
    @InjectRepository(Cat) public readonly catRepository: Repository<Cat>,
  ) {}
}

export { Repo };
