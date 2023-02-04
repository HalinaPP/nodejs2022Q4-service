import { TrackEntity } from './../entities/track.entity';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { CreateTrackDto } from '../dto/create-track.dto';

export interface TrackStorage {
  findAll: () => TrackEntity[];
  findOne: (id: string) => TrackEntity | undefined;
  delete: (id: string) => boolean;
  update: (
    id: string,
    trackForUpdate: UpdateTrackDto,
  ) => TrackEntity | undefined;
  create: (userData: CreateTrackDto) => TrackEntity;
}
