import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsBoolean()
  grammy: boolean;
}
