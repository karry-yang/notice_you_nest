import { Inject, Injectable } from '@nestjs/common';
import { IListicleRepository } from '@task/repositories/interfaces/listicle.repository.interface';
import { IListicleRepositoryToken } from 'src/common/token/tokens';
import { IListService } from './interface/listicle-server.interface';
import { CreateListicleDto } from '@task/dto/listicle/createListicle.dto';
import { UpdateListicleDto } from '@task/dto/listicle/updateListicle.dto';
import { Listicle } from '@task/entities/listicle.entity';

@Injectable()
export class ListicleService implements IListService {
  constructor(
    @Inject(IListicleRepositoryToken)
    private readonly listicleRep: IListicleRepository
  ) {}
  getListicleWithTask(listicleId: string): Promise<Listicle | null> {
    throw new Error('Method not implemented.');
  }
  getListicleByUserId(userId: string): Promise<Listicle[] | []> {
    throw new Error('Method not implemented.');
  }
  createListicle(createListicleDto: CreateListicleDto): Promise<Listicle | null> {
    throw new Error('Method not implemented.');
  }
  deleteListicle(ListicleId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateListicel(updateListicle: UpdateListicleDto) {
    throw new Error('Method not implemented.');
  }
}
