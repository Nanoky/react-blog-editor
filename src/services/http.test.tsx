/* import axios from 'axios'; */
import HttpService from './http';

jest.setTimeout(15000);

/* jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>; */

class Output {
    id: number;
    email: string;

    constructor(id: number, email: string) {
        this.id = id;
        this.email = email;
    }
}

/* class Input {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
} */

describe('http request', () => {
    var service: HttpService;
    /* const outputs = [new Output(1, 'Hello'), new Output(2, 'World')]; */

    beforeAll(() => {
        service = new HttpService({
            baseUrl: 'https://www.google.fr'
        });
    });

    test('should service defined', () => {
        expect(service).toBeTruthy();
    });

    test('should service required properties defined', () => {
        expect(service.axiosInstance).toBeTruthy();
    });

    test('should get success without processes', async () => {
        const result = await service?.get('https://catfact.ninja/fact');

        expect(result).toBeTruthy();
    });

    test('should get success without processes', async () => {
        const result = await service?.get<Output[]>(
            'https://reqres.in/api/users',
            undefined,
            (result: any) => {
                return result?.data.map((item: any) => {
                    return new Output(item.id, item.email);
                });
            },
            (err: any) => {
                throw err;
            }
        );

        expect(result).toBeTruthy();
        expect(result.length).toBeDefined();
        expect(result?.length).toBeGreaterThan(0);
        expect(result?.[0].email).toBeDefined();
    });
});
