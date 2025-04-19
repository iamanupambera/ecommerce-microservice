import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';
import {
  CreateGigDto,
  SearchGigDto,
  UpdateGigDto,
} from '@repo/validator/index';
import {
  AuthJwtPayload,
  CommonErrors,
  RedisService,
} from '@repo/modules/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { GigRepository } from './gig.repository';
import { Gig } from '@prisma/client';

@Injectable()
export class GigService {
  constructor(
    private readonly gigRepository: GigRepository,
    private readonly searchService: SearchService<Gig>,
    private readonly redisService: RedisService,
  ) {}

  async create(body: CreateGigDto, { email, username }: AuthJwtPayload) {
    const count = await this.searchService.getDocumentCount();
    const createdGig = await this.gigRepository.createGig({
      ...body,
      email,
      username,
      sortId: count,
    });
    await this.searchService.addDataToIndex(createdGig.id, createdGig);

    // update user service
    const data = {
      type: 'update-gig-count',
      gigSellerId: createdGig.sellerId,
      count: 1,
    };

    return {
      statusCode: 201,
      response: data,
      message: 'Gig created successfully',
    };
  }

  async findOne(id: string) {
    const gig = await this.searchService.getIndexItemById(id);

    if (!gig) {
      throw new NotFoundException(CommonErrors.GigNotFound);
    }
    return {
      statusCode: 200,
      response: gig,
      message: 'Gig retrieve successfully',
    };
  }

  async update(id: string, body: Omit<UpdateGigDto, 'id'>) {
    const updatedGig = await this.gigRepository.updateGig(id, body);
    // await updateIndexedData('gigs', `${document._id}`, data);
    return {
      statusCode: 200,
      response: updatedGig,
      message: 'Gig updated successfully.',
    };
  }

  async remove(gigId: string, sellerId: string) {
    await this.gigRepository.deleteGig(gigId);

    // update user service
    const data = {
      type: 'update-gig-count',
      gigSellerId: sellerId,
      count: -1,
    };

    await this.searchService.deleteIndexedData(gigId);
    return {
      statusCode: 200,
      response: data,
      message: 'Gig updated successfully.',
    };
  }

  async gigUpdateActive(gigId: string, active: boolean) {
    const updatedGig = await this.gigRepository.updateActiveGigProp(
      gigId,
      active,
    );
    // await updateIndexedData('gigs', `${document._id}`, data);

    return {
      statusCode: 200,
      response: updatedGig,
      message: 'Gig updated successfully.',
    };
  }

  async sellerGigs(sellerId: string) {
    const result = await this.gigsSearchBySellerId(sellerId, true);
    const gigs = result.hits.map((item) => item._source);

    return {
      statusCode: 200,
      response: gigs,
      message: 'Seller gigs',
    };
  }

  async sellerInactiveGigs(sellerId: string) {
    const result = await this.gigsSearchBySellerId(sellerId, false);
    const gigs = result.hits.map((item) => item._source);

    return { statusCode: 200, response: gigs, message: 'Seller gigs' };
  }

  async topRatedGigsByCategory(username: string) {
    const category = await this.redisService.redis.get(
      `selectedCategories:${username}`,
    );

    const result = await this.searchService.searchIndexItem({
      size: 10,
      query: {
        bool: {
          filter: {
            script: {
              script: {
                source:
                  "doc['ratingSum'].value != 0 && (doc['ratingSum'].value / doc['ratingsCount'].value == params['threshold'])",
                lang: 'painless',
                params: {
                  threshold: 5,
                },
              },
            },
          },
          must: [
            {
              query_string: {
                fields: ['categories'],
                query: `*${category}*`,
              },
            },
          ],
        },
      },
    });
    const total = result.hits.total as SearchTotalHits;
    const resultHits = result.hits.hits.map((item) => item._source);

    return {
      message: 'Search top gigs results',
      total,
      gigs: resultHits,
    };
  }

  async gigsByCategory(username: string) {
    const category = await this.redisService.redis.get(
      `selectedCategories:${username}`,
    );

    const result = await this.searchService.searchIndexItem({
      size: 10,
      query: {
        bool: {
          must: [
            {
              query_string: {
                fields: ['categories'],
                query: `*${category}*`,
              },
            },
            {
              term: {
                active: true,
              },
            },
          ],
        },
      },
    });
    const total = result.hits.total as SearchTotalHits;
    const resultHits = result.hits.hits.map((item) => item._source);

    return {
      message: 'Search gigs category results',
      total,
      gigs: resultHits,
    };
  }

  async moreLikeThis(gigId: string) {
    const result = await this.searchService.searchIndexItem({
      size: 5,
      query: {
        more_like_this: {
          fields: [
            'username',
            'title',
            'description',
            'basicDescription',
            'basicTitle',
            'categories',
            'subCategories',
            'tags',
          ],
          like: [
            {
              _index: 'gigs',
              _id: gigId,
            },
          ],
        },
      },
    });
    const total = result.hits.total as SearchTotalHits;

    const resultHits = result.hits.hits.map((item) => item._source);

    return {
      message: 'More gigs like this result',
      total,
      gigs: resultHits,
    };
  }

  async findAll(body: SearchGigDto) {
    const { searchQuery, deliveryTime, max, min, from, size, type } = body;
    const result = await this.searchService.searchIndexItem({
      size,
      query: {
        bool: {
          must: [
            {
              query_string: {
                fields: [
                  'username',
                  'title',
                  'description',
                  'basicDescription',
                  'basicTitle',
                  'categories',
                  'subCategories',
                  'tags',
                ],
                query: `*${searchQuery}*`,
              },
            },
            {
              term: {
                active: true,
              },
            },
            // if deliveryTime add in filter then add this search
            deliveryTime && {
              query_string: {
                fields: ['expectedDelivery'],
                query: `*${deliveryTime}*`,
              },
            },
            // if min max add in search then add this filter
            min &&
              max && {
                range: {
                  price: {
                    gte: min,
                    lte: max,
                  },
                },
              },
          ],
        },
      },
      sort: [
        {
          sortId: type === 'forward' ? 'asc' : 'desc',
        },
      ],
      search_after: [from],
    });
    const total = result.hits.total as SearchTotalHits;
    return {
      total: total.value,
      hits: result.hits.hits,
    };
  }

  private async gigsSearchBySellerId(searchQuery: string, active: boolean) {
    const result = await this.searchService.searchIndexItem({
      query: {
        bool: {
          must: [
            {
              query_string: {
                fields: ['sellerId'],
                query: `*${searchQuery}*`,
              },
            },
            {
              term: {
                active,
              },
            },
          ],
        },
      },
    });
    const total = result.hits.total as SearchTotalHits;
    return {
      total: total.value,
      hits: result.hits.hits,
    };
  }
}
