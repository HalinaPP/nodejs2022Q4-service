import { IsAlpha, Length, IsUUID, IsInt } from 'class-validator';
export class CreateTrackDto {
  @IsAlpha()
  @Length(2, 20)
  name: string;

  @IsUUID()
  artistId: string | null;

  @IsUUID()
  albumId: string | null;

  @IsInt()
  duration: number;
}
