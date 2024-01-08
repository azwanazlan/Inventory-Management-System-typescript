export interface IAgent {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
}

export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IPagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}
  
export interface IResponseData<T> {
    data: T;
    //pagination: IPagination;
}