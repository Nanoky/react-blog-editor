import React from 'react';
import {render, screen} from '@testing-library/react';
import { ServiceProvider } from './Service';
import { useUnsplashEnabled } from 'hooks/useUnsplash';

const TestComponent = () => {
    const enabled = useUnsplashEnabled();
    return (
        <div>
            <h1>{`${enabled}`}</h1>
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
});
