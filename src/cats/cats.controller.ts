import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Cat } from 'src/cats/cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

/**
 * Controlador do módulo de Cats.
 * Controlador fica responsável por gerenciar as  solicitaçãoes, referentes
 * aos Cats, de entrada e entregar as respostas para o usuário.
 */
@Controller({ path: 'cats' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * Método index()
   * Responsável por dar boas vindas ao usuário.
   * @returns string
   */
  @Get()
  async index(): Promise<string> {
    const catsQuantity = await (await this.catsService.listALl()).length;
    const openingMessage = `
      Hello, welcome to the cats application. 
      We currently have ${catsQuantity} cat(s) registered in our system.
    `;
    console.log(openingMessage);
    return this.catsService.getIndex(openingMessage);
  }

  @Get('find/:id')
  async listACat(@Param('id') id: string): Promise<Cat> {
    console.log(`LIsting id cat record: ${id}`);
    const cat = await this.catsService.findCatById(id);
    return cat;
  }

  @Get('all')
  async listAll(): Promise<Cat[]> {
    console.log('Listing all cat records.');
    const cats = await this.catsService.listALl();
    return cats;
  }

  @Post('/create')
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    console.log('Creating cat record.');
    const cat = await this.catsService.createCat(createCatDto);
    return cat;
  }

  @Put('/update/:id')
  async updateCat(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    console.log(`Changing id record: ${id}`);
    return await this.catsService.updateCat(id, updateCatDto);
  }

  @Delete('/delete/:id')
  async deleteCat(@Param('id') id: string): Promise<boolean> {
    console.log(`Deleting id record: ${id}`);
    return await this.catsService.deleteCat(id);
  }
}
