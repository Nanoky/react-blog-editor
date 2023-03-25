/* eslint-disable no-unused-vars */

import HttpService from './http';

const SEARCH_URL = '/search/photos';

export class UnsplashPhoto {
    id: string;
    link: string;
    description: string;
    author: string;
    authorLink: string;

    static convertFrom = (data: any): UnsplashPhoto => {
        return {
            id: data?.id,
            link: data?.links?.photos,
            description: data?.description,
            author: data?.user?.name,
            authorLink: data?.user?.['portfolio_url']
        };
    };
}

export class UnsplashResponse {
    data: UnsplashPhoto[] = [];
    total: number = 0;
    totalPage: number = 0;

    static convertFrom = (data: any) => {
        const response = new UnsplashResponse();
        response.data = data?.results?.map((item: any) =>
            UnsplashPhoto.convertFrom(item)
        );
        response.total = data?.total;
        response.totalPage = data?.['total_pages'];

        return response;
    };
}

export interface QueryParams {
    query: string;
    page?: number;
    perPage?: number;
}

const getQueryUrl = (
    url: string,
    { query, page = 1, perPage = 10 }: QueryParams
) => {
    return `${url}?query=${query}&page=${page}&per_page=${perPage}`;
};

export const searchUnsplash = (
    service: HttpService,
    params: QueryParams
): Promise<UnsplashResponse> => {
    return service.get<UnsplashResponse>(
        getQueryUrl(SEARCH_URL, {
            query: params.query,
            page: params.page,
            perPage: params.perPage
        }),
        undefined,
        (data: any) => {
            return UnsplashResponse.convertFrom(data);
        },
        (err) => {
            throw err;
        }
    );
};
