/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import useHttp from './useHttp';
import { UnsplashResponse, searchUnsplash } from 'services/unsplashService';
import { useUnspashService } from 'components/providers/Unsplash';
import { useEffect, useState } from 'react';

interface HookResponse {
    search: (pattern: string, page?: number, perPage?: number) => void;
    response: UnsplashResponse;
    loading: boolean;
    error: any;
}

export const useSearch = (): HookResponse => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number | undefined>();
    const [perPage, setPerPage] = useState<number | undefined>();
    const [pattern, setPattern] = useState('');

    const http = useHttp<UnsplashResponse>(new UnsplashResponse());
    const service = useUnspashService();

    useEffect(() => {
        if (service && loading) {
            http.call(searchUnsplash(service, pattern, page, perPage));
            setLoading(false);
        }
    }, [service]);

    const search = (pattern: string, page?: number, perPage?: number) => {
        if (service) {
            http.call(searchUnsplash(service, pattern, page, perPage));
        } else {
            if (!loading) {
                setLoading(true);
                setPage(page);
                setPerPage(perPage);
                setPattern(pattern);
            }
        }
    };

    return {
        search,
        response: http.response,
        loading: http.loading,
        error: http.error
    };
};
