import HttpService from "./http";
import { searchUnsplash } from "./unsplashService";

const BASE_URL = 'https://api.unsplash.com';
const ACCESS_TOKEN = process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN;
const ACCESS_TYPE = 'Client-ID';

jest.setTimeout(15000);

describe('Unsplash resquest', () => {

    test('should get request receive response', async () => {
        const response = await searchUnsplash(new HttpService({
            baseUrl: BASE_URL,
            key: ACCESS_TOKEN,
            keyType: ACCESS_TYPE
        }), "hello");

        expect(response).toBeDefined();
    })
})