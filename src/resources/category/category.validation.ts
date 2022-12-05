import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CategoryRequest {
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
    name!: string;

  @MinLength(10)
  @IsNotEmpty()
  @IsString()
    description!: string;
}

export class CategoryIdRequest {
  @IsString()
    categoryId!: string;
}
