import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export class InMemoryArtistStorage {
  private artists: ArtistEntity[] = [];

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  findOne(id: string): ArtistEntity | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  delete(id: string): boolean {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index < 0) {
      return false;
    }

    this.artists.splice(index, 1);

    return true;
  }

  update(
    id: string,
    artistForUpdate: UpdateArtistDto,
  ): ArtistEntity | undefined {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index < 0) {
      return undefined;
    }

    this.artists[index] = {
      ...this.artists[index],
      ...artistForUpdate,
    };

    return this.artists[index];
  }

  create(artistData: CreateArtistDto): ArtistEntity {
    const id = uuidv4();

    const newArtist: ArtistEntity = {
      id,
      ...artistData,
    };
    this.artists.push(newArtist);

    return newArtist;
  }
}
