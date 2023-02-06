import { Length, IsInt, IsString } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  @Length(2, 20)
  name: string;

  //@IsUUID()
  artistId: string | null;

  //@IsUUID()
  albumId: string | null;

  @IsInt()
  duration: number;
}
