import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';
import {
  CreateGigDto,
  SearchGigDto,
  UpdateGigDto,
} from '@repo/validator/index';
import {
  AuthJwtPayload,
  CommonErrors,
  LoggerService,
  RedisService,
} from '@repo/modules/index';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { GigRepository, ratingTypes } from './gig.repository';
import { Gig } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';

@Injectable()
export class GigService {
  constructor(
    private readonly gigRepository: GigRepository,
    private readonly searchService: SearchService<Gig>,
    private readonly redisService: RedisService,
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
    private readonly logger: LoggerService,
    private readonly gatewayJwtService: GatewayJwtService,
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

    // update user service gig count
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'seller', cmd: 'updateGigsCount' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            gigSellerId: createdGig.sellerId,
            count: 1,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            GigService.name + ' service error at auth register',
            error,
          );
        },
      });

    return {
      statusCode: 201,
      response: createdGig,
      message: 'Gig created successfully',
    };
  }

  async findAll(body: SearchGigDto) {
    const { searchQuery, deliveryTime, max, min, from, size, type } = body;

    const mustQueries = [
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
      // Conditionally add deliveryTime query
      deliveryTime && {
        query_string: {
          fields: ['expectedDelivery'],
          query: `*${deliveryTime}*`,
        },
      },
      // Conditionally add min and max range query
      min &&
        max && {
          range: {
            price: {
              gte: min,
              lte: max,
            },
          },
        },
    ].filter(Boolean); // Remove falsy values

    const result = await this.searchService.searchIndexItem({
      size,
      query: {
        bool: {
          must: mustQueries,
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
      statusCode: 200,
      response: { total: total.value, hits: result.hits.hits },
      message: 'gig list',
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

  async findSellerGigs(sellerId: string) {
    const result = await this.gigsSearchBySellerId(sellerId, true);
    const gigs = result.hits.map((item) => item._source);

    return {
      statusCode: 200,
      response: gigs,
      message: 'Seller gigs',
    };
  }

  async findSellerInactiveGigs(sellerId: string) {
    const result = await this.gigsSearchBySellerId(sellerId, false);
    const gigs = result.hits.map((item) => item._source);

    return { statusCode: 200, response: gigs, message: 'Seller gigs' };
  }

  async findTopRatedGigsByCategory(username: string) {
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
      statusCode: 200,
      response: { total, gigs: resultHits },
      message: 'Search top gigs results',
    };
  }

  async findGigsByCategory(username: string) {
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
      statusCode: 200,
      response: { total, gigs: resultHits },
      message: 'Search gigs category results',
    };
  }

  async findMoreGigsLikeThis(gigId: string) {
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
      statusCode: 200,
      response: { total, gigs: resultHits },
      message: 'More gigs like this result',
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

  async update(id: string, body: Omit<UpdateGigDto, 'id'>) {
    const updatedGig = await this.gigRepository.updateGig(id, body);
    await this.searchService.updateIndexedData(updatedGig.id, updatedGig);
    return {
      statusCode: 200,
      response: updatedGig,
      message: 'Gig updated successfully.',
    };
  }

  async updateGigReview(body: {
    gigId: string;
    rating: keyof typeof ratingTypes;
  }) {
    const data = await this.gigRepository.updateGigReview(body);
    await this.searchService.updateIndexedData(data.id, data);

    return {
      statusCode: 200,
      response: {},
      message: 'Gig updated successfully.',
    };
  }

  async changeStatus(gigId: string, active: boolean) {
    const updatedGig = await this.gigRepository.updateActiveGigProp(
      gigId,
      active,
    );
    await this.searchService.updateIndexedData(updatedGig.id, updatedGig);

    return {
      statusCode: 200,
      response: updatedGig,
      message: 'Gig updated successfully.',
    };
  }

  async remove(gigId: string, sellerId: string) {
    await this.gigRepository.deleteGig(gigId);

    // update user gig count
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'seller', cmd: 'updateGigsCount' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            gigSellerId: sellerId,
            count: -1,
          },
          user: null,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            GigService.name + ' service error at auth register',
            error,
          );
        },
      });

    await this.searchService.deleteIndexedData(gigId);
    return {
      statusCode: 200,
      response: {},
      message: 'Gig updated successfully.',
    };
  }
}
