import React, { useEffect } from "react";
import { useSearch } from "./useUnsplash"
import { render, screen, waitFor } from "@testing-library/react";
import { ServiceProvider } from "components/providers/Service";

const ACCESS_TOKEN = process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN;

jest.setTimeout(15000);

const TestComponent = () => {
    const query = useSearch();

    useEffect(() => {
        query.search("hello");
    }, []);

    return (
        <div>
            {
                query.response.data.map((image) => (
                    <h1 key={image.id}>{image.description}</h1>
                ))
            }
        </div>
    )
}

describe('Unsplash hooks must work', () => {

    test('should hooks query return something', async () => {

        render(
            <ServiceProvider unsplashKey={ACCESS_TOKEN}>
                <TestComponent />
            </ServiceProvider>
        )

        await waitFor(() => {
            expect(screen.queryAllByRole('heading').length).toBeGreaterThan(0);
        });

        const paragraphs = screen.getAllByRole('heading', {level: 1});
        expect(paragraphs.length).toBeGreaterThan(0);
        expect(paragraphs[0].textContent).toBeTruthy();
    })
})