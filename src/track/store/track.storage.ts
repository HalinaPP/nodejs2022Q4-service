import { TrackEntity } from './../entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';

export class InMemoryTrackStorage {
  private tracks: TrackEntity[] = [];

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  findOne(id: string): TrackEntity | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  delete(id: string): boolean {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index < 0) {
      return false;
    }

    this.tracks.splice(index, 1);

    return true;
  }

  update(id: string, trackForUpdate: UpdateTrackDto): TrackEntity | undefined {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index < 0) {
      return undefined;
    }

    this.tracks[index] = {
      ...this.tracks[index],
      ...trackForUpdate,
    };

    return this.tracks[index];
  }

  create(trackData: CreateTrackDto): TrackEntity {
    const id = uuidv4();

    const newTrack: TrackEntity = {
      id,
      ...trackData,
    };
    this.tracks.push(newTrack);

    return newTrack;
  }

  setNullToAlbumId(albumId: string): void {
    const tracks = this.findAll();

    const updatedTracks = tracks.map((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }

      return track;
    });

    this.tracks = [...updatedTracks];
  }

  setNullToArtistId(artistId: string): void {
    const tracks = this.findAll();

    const updatedTracks = tracks.map((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }

      return track;
    });

    this.tracks = [...updatedTracks];
  }
}
