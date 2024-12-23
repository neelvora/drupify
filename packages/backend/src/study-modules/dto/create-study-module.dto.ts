import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStudyModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;
}
