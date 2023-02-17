import { Length, IsInt, IsString } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  @Length(2, 20)
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsInt()
  duration: number;
}
