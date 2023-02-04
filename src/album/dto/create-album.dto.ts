import { IsInt, IsString, Length, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  artistId: string | null;
}
