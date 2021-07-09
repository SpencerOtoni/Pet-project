/**
 * Data transfer object (Objeto de transferência de dados)
 * É um padrão de projeto de software usado para transferir dados
 * entre subsistemas de um software.
 */
 import { Field, InputType, Int } from '@nestjs/graphql';
 @InputType()
 export class CreateCatDto {
  @Field(()=> String)
  name: string;

  @Field(()=> Int, {nullable: true})
  age: number;
}

