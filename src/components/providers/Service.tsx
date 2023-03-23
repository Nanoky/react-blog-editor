/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react';
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
    const [services, setServices] = useState({});
    useConfigUnspash(setServices, unsplashKey);

    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
};
