/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import useHttp, { useServiceEnabled } from './useHttp';
import { QueryParams, UnsplashResponse, searchUnsplash } from 'services/unsplashService';
import { UNSPLASH_SERVICE_NAME } from 'components/providers/Unsplash';
import { useCallback } from 'react';

interface HookResponse {
    search: (pattern: string, page?: number, perPage?: number) => void;
    response: UnsplashResponse;
    loading: boolean;
    error: any;
}

export const useSearch = (): HookResponse => {
    const http = useHttp<UnsplashResponse, QueryParams>(UNSPLASH_SERVICE_NAME, new UnsplashResponse());

    const search = useCallback((pattern: string, page?: number, perPage?: number) => {
        http.call(searchUnsplash, {
            query: pattern,
            page: page,
            perPage: perPage
        });
    }, [http]);

    return {
        search,
        response: http.response,
        loading: http.loading,
        error: http.error
    };
};

export const useUnsplashEnabled = () => {
    return useServiceEnabled(UNSPLASH_SERVICE_NAME);
};
