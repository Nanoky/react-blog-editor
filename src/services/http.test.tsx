import axios from 'axios';
import HttpService from './http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

class Output {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
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
    const outputs = [new Output(1, 'Hello'), new Output(2, 'World')];

    beforeAll(() => {
        service = new HttpService({
            baseUrl: "https://www.google.fr"
        });
    });

    test('should service defined', () => {
        expect(service).toBeTruthy();
    });

    test('should service required properties defined', () => {
        expect(service.axiosInstance).toBeTruthy();
    });

    test('should a new axiosInstance be defined', () => {
        const instance = mockedAxios.create();

        expect(axios).toBeDefined();
        expect(axios.create).toBeDefined();
        expect(mockedAxios).toBeDefined();
        expect(instance).toBeDefined();
    })

    test('should get success without processes', async () => {
        mockedAxios.get.mockResolvedValue(outputs);
        const result = await service?.get('https://catfact.ninja/fact');

        expect(result).toBeTruthy();
    });
});
