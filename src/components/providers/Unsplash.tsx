/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { ContextType, useService } from './Service';
import HttpService from 'services/http';

const UNSPLASH_SERVICE_NAME = 'unsplash';

export const useUnspashService = () => {
    const services = useService();

    return services?.[UNSPLASH_SERVICE_NAME];
};

export const useUnsplashEnabled = () => {
    const services = useService();

    return !!services[UNSPLASH_SERVICE_NAME];
};

export const useConfigUnspash = (
    onServicesUpdate: React.Dispatch<React.SetStateAction<{}>>,
    key?: string
) => {
    useEffect(() => {
        if (key) {
            onServicesUpdate((prev) => setUnsplashService(prev, key));
        }
    }, [key]);

    const setUnsplashService = (prev: ContextType, key: string) => {
        return {
            ...prev,
            [UNSPLASH_SERVICE_NAME]: new HttpService({
                key: key,
                keyType: 'Client-ID'
            })
        };
    };
};
