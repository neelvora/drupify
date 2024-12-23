import { IsString, IsOptional } from 'class-validator';

export class UpdateStudyModuleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
