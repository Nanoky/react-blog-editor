import React from 'react';
import {render, screen} from '@testing-library/react';
import { useUnspashService, useUnsplashEnabled } from './Unsplash';
import { ServiceProvider, useService } from './Service';

const TestComponent = () => {
    const services = useService();
    const service = useUnspashService();
    const enabled = useUnsplashEnabled();
    return (
        <div>
            <h2>{service?.key}</h2>
            <h1>{`${enabled}`}</h1>
            <h3>{Object.keys(services).length}</h3>
        </div>
    );
};

describe('With key tests', () => {
    const key = 'hello';
    beforeEach(() => {
        render(
            <ServiceProvider unsplashKey={key}>
                <TestComponent />
            </ServiceProvider>
        );
    })
    test('should unsplash service be enabled', () => {
        const enabledSpan = screen.getByRole('heading', {level: 1});
        expect(enabledSpan.textContent).toBe('true');
    });
    test('should unsplash service created', () => {
        const serviceKey = screen.getByRole('heading', {level: 2});
        expect(serviceKey.textContent).toBe(key);
    });
});

describe('Without key tests', () => {
    beforeEach(() => {
        render(
            <ServiceProvider>
                <TestComponent />
            </ServiceProvider>
        );
    })
    test('should unsplash service be enabled', () => {
        const enabledSpan = screen.getByRole('heading', {level: 1});
        expect(enabledSpan.textContent).toBe('false');
    });
    test('should unsplash service created', () => {
        const serviceKey = screen.getByRole('heading', {level: 2});
        expect(serviceKey.textContent).toBe('');
    });
});
