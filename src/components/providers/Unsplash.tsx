/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import HttpService from 'services/http';

export const UNSPLASH_SERVICE_NAME = 'unsplash';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

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
