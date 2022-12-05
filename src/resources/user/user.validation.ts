import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class signUpRequest {
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
    name!: string;

  @MinLength(4)
  @IsNotEmpty()
  @IsString()
    login!: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
    password!: string;
}

export class signInRequest {
  @IsNotEmpty()
  @IsString()
    login!: string;

  @IsNotEmpty()
  @IsString()
    password!: string;
}
