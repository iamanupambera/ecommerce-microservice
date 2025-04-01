export interface PaginationParams {
  from: string;
  size: number;
  type: 'forward' | 'backward';
}

export interface SearchGigsParams {
  searchQuery: string;
  pagination: {
    from: string;
    size: number;
    type: 'forward' | 'backward';
  };
  filters?: {
    deliveryTime?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  sortField?: string;
}
