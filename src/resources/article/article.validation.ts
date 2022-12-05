import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CategoryRequest {
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
    name!: string;

  @MinLength(10)
  @IsNotEmpty()
  @IsString()
    content!: string; // TODO file or text

  @IsNotEmpty()
  @IsString()
    categoryId!: string;

  @IsNotEmpty()
  @IsString()
    userId!: string;
}
