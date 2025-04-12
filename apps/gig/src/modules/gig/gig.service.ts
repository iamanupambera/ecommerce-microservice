import { Injectable } from '@nestjs/common';
import { GigRepository } from './gig.repository';

@Injectable()
export class GigService {
  constructor(private readonly gigRepository: GigRepository) {}

  create(createGigDto: any) {
    return createGigDto;
  }

  findAll() {
    return `This action returns all gig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gig`;
  }

  update(id: string, updateGigDto: any) {
    return updateGigDto;
  }

  remove(id: number) {
    return `This action removes a #${id} gig`;
  }
}
