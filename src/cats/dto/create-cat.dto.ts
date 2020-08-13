import { Min, Length } from 'class-validator';

import { CreateCatInput } from '../../schema/graphql.schema';

export class CreateCatDto extends CreateCatInput {
  @Length(2, 100)
  name: string;

  @Min(1)
  age: number;
}
