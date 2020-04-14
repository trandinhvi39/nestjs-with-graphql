import { Min } from 'class-validator';
import { CreateCatInput } from '../../schema/graphql.schema';

export class CreateCatDto extends CreateCatInput {
  @Min(1)
  age: number;
}
