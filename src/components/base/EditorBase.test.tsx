import React, { useState } from 'react';
import EditorBase from './EditorBase';
import { render, screen } from '@testing-library/react';
import { ServiceProvider } from 'components/providers/Service';

interface Props {
    initContent?: string;
}
const ACCESS_TOKEN = process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN;

jest.setTimeout(15000);

const contentTestId = 'contentDiv';

const TestComponent = ({ initContent }: Props) => {
    const [content, setContent] = useState<string>(initContent ?? '');

    const handleChange = (value: string) => {
        setContent(value);
    };

    return (
        <div>
            <EditorBase
                placeholder='Write something ...'
                onHTMLChange={handleChange}
                initialContent={content}
            />
            <div data-testid={contentTestId}>{content}</div>
        </div>
    );
};

describe('EditorBase without service provider test suite', () => {
    test('should EditorBase content be defined', () => {
        const value = 'Hello world';
        const content = `<p>${value}</p>`;

        render(<TestComponent initContent={content} />);

        const contentElement = screen.getByText(value);
        expect(contentElement).toBeDefined();
    });
});

describe('EditorBase without service provider test suite', () => {
    test('should EditorBase content be defined', () => {
        const value = 'Hello world';
        const content = `<p>${value}</p>`;

        render(
            <ServiceProvider unsplashKey={ACCESS_TOKEN}>
                <TestComponent initContent={content} />
            </ServiceProvider>
        );

        const contentElement = screen.getByText(value);
        expect(contentElement).toBeDefined();
    });
});
