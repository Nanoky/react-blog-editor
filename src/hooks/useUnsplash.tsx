/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import useHttp from './useHttp';
import { UnsplashResponse, searchUnsplash } from 'services/unsplashService';
import { useUnspashService } from 'components/providers/Unsplash';

interface HookResponse {
    search: (pattern: string, page?: number, perPage?: number) => void;
    response: UnsplashResponse;
    loading: boolean;
    error: any;
}

export const useSearch = (): HookResponse => {
    const http = useHttp<UnsplashResponse>(new UnsplashResponse());
    const service = useUnspashService();

    const search = (pattern: string, page?: number, perPage?: number) => {
        if (service) {
            http.call(searchUnsplash(service, pattern, page, perPage));
        } else {
            throw 'Unsplash service not defined';
        }
    };

    return {
        search,
        response: http.response,
        loading: http.loading,
        error: http.error
    };
};
