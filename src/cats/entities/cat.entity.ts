import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

ObjectType({description: 'Cat Models'})
@Entity({name: 'cats' })
export class Cat {
  @Field(() => ID)
  @PrimaryColumn()
  readonly id: string;

  @Field(() => String, {description: 'Name cat'})
  @Column()
  name: string;

  @Field(() => Int ,{ nullable: true})
  @Column()
  age: number;

  @Field(() => Date)
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;


  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

