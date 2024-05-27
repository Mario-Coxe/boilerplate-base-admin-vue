interface PaginationParams {
    search?: string;
    lastPage?: number;
    page?: number;
    perPage?: number;
    total?: number;
  }
  
  interface Driver {
    uuid: string;
    id: number;
    slug: string;
    description: string;
    is_active: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
  }
  
  interface PaginatedResponse {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
    data: Driver[];
  }
  