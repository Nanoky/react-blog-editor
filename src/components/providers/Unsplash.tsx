/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useService } from './Service';
import HttpService from 'services/http';

const UNSPLASH_SERVICE_NAME = 'unsplash';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export const useUnspashService = () => {
    const services = useService();

    return services?.[UNSPLASH_SERVICE_NAME];
};

export const useUnsplashEnabled = () => {
    const services = useService();

    return !!services[UNSPLASH_SERVICE_NAME];
};

export const useConfigUnspash = (
    onServicesUpdate: (service: HttpService, name: string) => void,
    key?: string
) => {
    useEffect(() => {
        if (key) {
            onServicesUpdate(
                new HttpService({
                    baseUrl: UNSPLASH_BASE_URL,
                    key: key,
                    keyType: 'Client-ID'
                }),
                UNSPLASH_SERVICE_NAME
            );
        }
    }, [key]);
};
