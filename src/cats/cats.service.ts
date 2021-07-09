import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

/**
 * Serviço CatsService
 *
 * Serviço é responsável por executar ações de CRUD.
 */
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  /**
   * @Author - <Marllon Soares> - marlonmcs@hotmail.com
   * @Date - 08/07/2021 20:21:00
   * @allEditors - [<Marllon Soares> - marlonmcs@hotmail.com, ...]
   * @LasEditor -
   * @Description - Método de start.
   * @param id - Identificador único de um Cat
   * @returns string - Retorna um Array de Cat.
   */
  getIndex(message = ''): string {
    if (message) {
      return message;
    }
    return 'Hello, welcome to the cats application.';
  }

  /**
   * @Author - <Marllon Soares> - marlonmcs@hotmail.com
   * @Date - 08/07/2021 20:21:00
   * @allEditors - [<Marllon Soares> - marlonmcs@hotmail.com, ...]
   * @LasEditor -
   * @Description - Método responsável por listar todos os Cats.
   * @param id - Identificador único de um Cat
   * @returns Promise<Cat[]> - Retorna um Array de Cat.
   */
  async listALl(): Promise<Cat[]> {
    const cats = await this.catRepository.find();
    return cats;
  }

  /**
   * @Author - <Marllon Soares> - marlonmcs@hotmail.com
   * @Date - 08/07/2021 20:21:00
   * @allEditors - [<Marllon Soares> - marlonmcs@hotmail.com, ...]
   * @LasEditor -
   * @Description - Método responsável por criar dados de Cats no banco de dados.
   * @param id - Identificador único de um Cat
   * @returns Promise<Cat> - Retorna um objeto de Cat.
   */
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

  /**
   * @Author - <Marllon Soares> - marlonmcs@hotmail.com
   * @Date - 08/07/2021 20:21:00
   * @allEditors - [<Marllon Soares> - marlonmcs@hotmail.com, ...]
   * @LasEditor -
   * @Description - Método responsável por buscar um cat com base no ID.
   * @param id - Identificador único de um Cat
   * @returns Promise<Cat> - Retorna um objeto de Cat.
   */
  async findCatById(id: string): Promise<Cat> {
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
      throw new NotFoundException('Cat not found.');
    }
    return cat;
  }

  /**
   * @Author - <Marllon Soares> - marlonmcs@hotmail.com
   * @Date - 08/07/2021 20:21:00
   * @allEditors - [<Marllon Soares> - marlonmcs@hotmail.com, ...]
   * @LasEditor -
   * @Description - Método responsável por alterar um cat no banco de dados.
   * @param id - Identificador único de um Cat
   * @returns Promise<Cat> - Retorna o cat alterado.
   */
  async updateCat( data: UpdateCatDto): Promise<Cat> {
    await this.findCatById(data.id);
    await this.catRepository.save(data);
    return this.findCatById(data.id);
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
