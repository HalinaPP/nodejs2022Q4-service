import { IsInt, IsString, Length } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsInt()
  year: number;

  artistId: string | null;
}
