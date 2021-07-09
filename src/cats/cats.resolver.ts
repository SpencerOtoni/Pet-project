import { Resolver, Args, Mutation, Query, Int } from '@nestjs/graphql';
import { Cat } from 'src/cats/entities/cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

/**
 * Controlador do módulo de Cats.
 * Controlador fica responsável por gerenciar as  solicitaçãoes, referentes
 * aos Cats, de entrada e entregar as respostas para o usuário.
 */
@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  /**
   * Método index()
   * Responsável por dar boas vindas ao usuário.
   * @returns string
   */
  @Query(() => String)
  async index(): Promise<string> {
    const catsQuantity = (await this.catsService.listALl()).length;
    const openingMessage = `
      Hello, welcome to the cats application. 
      We currently have ${catsQuantity} cat(s) registered in our system.
    `;
    console.log(openingMessage);
    return this.catsService.getIndex(openingMessage);
  }

  @Query(() => [Cat])
  async listACat(@Args('id', { type: () => String}) id: string): Promise<Cat> {
    console.log(`LIsting id cat record: ${id}`);
    const cat = await this.catsService.findCatById(id);
    return cat;
  }

  @Query(() => Cat)
  async listAll(): Promise<Cat[]> {
    console.log('Listing all cat records.');
    const cats = await this.catsService.listALl();
    return cats;
  }

  @Mutation(() => Cat)
  async createCat(@Args('data') data: CreateCatDto): Promise<Cat> {
    console.log('Creating cat record.');
    const cat = await this.catsService.createCat(data);
    return cat;
  }

  @Mutation(() => Cat)
  async updateCat(
    @Args('data') data: UpdateCatDto,
  ): Promise<Cat> {
    console.log(`Changing id record: ${data.id}`);
    return await this.catsService.updateCat(data);
  }

  @Mutation(() => Boolean)
  async deleteCat(@Args('id') id: string): Promise<boolean> {
    console.log(`Deleting id record: ${id}`);
    return await this.catsService.deleteCat(id);
  }
}
