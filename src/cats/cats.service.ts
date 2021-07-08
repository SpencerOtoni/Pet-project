import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

/**
 * Serviço CatsService
 *
 * Serviço é responsável por executar ações gerais do módulo Cats.
 */
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  getIndex(message = ''): string {
    if (message) {
      return message;
    }
    return 'Seja bem-vindo(a) a Cats Aplication';
  }

  async listALl(): Promise<Cat[]> {
    const cats = await this.catRepository.find();
    return cats;
  }

  async createCat(data: CreateCatDto): Promise<Cat> {
    const cat = this.catRepository.create(data);
    const catSaved = await this.catRepository.save(cat);

    if (!catSaved) {
      throw new InternalServerErrorException(
        'Unable to insert the cat. Please try again.',
      );
    }
    return catSaved;
  }

  async findCatById(id: string): Promise<Cat> {
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
      throw new NotFoundException('Cat not found.');
    }
    return cat;
  }

  async updateCat(id: string, data: UpdateCatDto): Promise<Cat> {
    await this.findCatById(id);
    await this.catRepository.update(id, data);
    return this.findCatById(id);
  }

  /**
   * @Author - <Marllon Soares> - marlonmcs@hotmail.com
   * @Date - 08/07/2021 19:00:00
   * @allEditors - [<Marllon Soares> - marlonmcs@hotmail.com, ...]
   * @LasEditor -
   * @Description - Método responsável por deletar um cat no banco de dados.
   * @param id - Identificador único de um Cat
   * @returns Promise<boolean> - Retorna true caso sucesso e falso caso contrário
   */
  async deleteCat(id: string): Promise<boolean> {
    await this.findCatById(id);
    const catDeleted = await this.catRepository.delete(id);
    return catDeleted ? true : false;
  }
}
