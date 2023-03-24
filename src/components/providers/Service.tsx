/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useState } from 'react';
import HttpService from 'services/http';
import { useConfigUnspash } from './Unsplash';

interface providerProps {
    unsplashKey?: string;
    children: React.ReactNode;
}

export interface ContextType {
    [name: string]: HttpService;
}

const ServiceContext = createContext<ContextType>({});

export const useService = () => {
    return useContext(ServiceContext);
};

export const ServiceProvider = ({ unsplashKey, children }: providerProps) => {
    const [services, setServices] = useState<ContextType>({});

    const addService = useCallback((service: HttpService, name: string) => {
        setServices((prev) => getNewServices(prev, service, name));
    }, [services]);

    const getNewServices = (
        prev: ContextType,
        service: HttpService,
        name: string
    ) => {
        const newServices : ContextType = {
            ...prev,
            [name]: service
        };
        return newServices;
    };

    useConfigUnspash(addService, unsplashKey);

    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
};
