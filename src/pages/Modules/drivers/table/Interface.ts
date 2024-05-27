interface Supplier {
    uuid: string;
    id: number;
    name: string;
    phone_number: string;
    address: string;
    email: string;
    ride_minimum_time_duration: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

interface Driver {
    uuid: string;
    id: number;
    full_name: string;
    phone_number: string;
    email: string;
    supplier_id: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
    status: string;
    suppliers: Supplier;
}

interface PaginationParams {
    search?: string;
    lastPage?: number;
    page?: number;
    perPage?: number;
    total?: number;
}

export interface PaginatedResponse {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
    data: Driver[];
}
