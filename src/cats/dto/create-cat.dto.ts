import { Min } from 'class-validator';

import { CreateCatInput } from '../../schema/graphql.schema';

export class CreateCatDto extends CreateCatInput {
  name: string;
  age: number;
}
