/**
 * Data transfer object (Objeto de transferência de dados)
 * É um padrão de projeto de software usado para transferir dados
 * entre subsistemas de um software.
 */

 import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
 export class UpdateCatDto {
  @Field(() => String)
  id: string;

  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => Int, {nullable: true})
  age?: number;
}

