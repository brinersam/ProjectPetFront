export type Envelope<T> = {
    result: T;
    timeGenerated: string;
    errors: Error[];
  };

export type PagedList<T> = {
    data: T,
    totalCount: number,
    pageSize: number,
    pageIndex: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}

export type Error = {
    code: string,
    message : string,
    type : ErrorType
}

export enum ErrorType{
    Not_set = 0,
    Validation = 422,
    NotFound = 404,
    Failure = 500,
    Conflict = 501
}