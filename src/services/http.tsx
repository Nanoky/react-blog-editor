
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';

interface HttpConfig {
    baseUrl?: string;
    key?: string;
    keyType?: string;
}

class HttpService implements HttpConfig {

    axiosInstance: AxiosInstance;
    private abortController: AbortController

    baseUrl?: string | undefined;
    key: string | undefined;
    keyType: string | undefined;

    constructor(config?: HttpConfig) {
        this.baseUrl = config?.baseUrl;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl
        });

        this.abortController = new AbortController();

        this.key = config?.key;
        this.keyType = config?.keyType;

        this.axiosInstance?.interceptors.request.use(
            this.requestInterceptorSuccess,
            this.requestInterceptorError
        );
        this.axiosInstance?.interceptors.response.use(
            this.responseInterceptorSuccess,
            this.responseInterceptorError
        );

    }

    requestInterceptorSuccess = (config: InternalAxiosRequestConfig) => {
        if (this.key) {
            config.headers.Authorization = `${this.keyType} ${this.key}`;
        }

        config.signal = this.abortController.signal;

        return config;
    };

    responseInterceptorSuccess = (response: AxiosResponse) => {
        return response;
    };

    requestInterceptorError = (error: any) => {
        Promise.reject(error);
    };

    responseInterceptorError = (error: any) => {
        Promise.reject(error);
    };

    private applyProcesses = <O,>(
        promise: Promise<AxiosResponse>,
        success?: <I>(data: I, status: number) => O,
        error?: <T>(error: T) => void
    ) => {

        return promise
            .then((response) : O | AxiosResponse =>
                success ? success(response.data, response.status) : response
            )
            .catch((err) => (error ? error(err) : err));
    };

    get = <O,>(
        url: string,
        config?: AxiosRequestConfig,
        _successProcess?: <I>(data: I, status: number) => O,
        _errorProcess?: <T>(error: T) => void
    ) => {
        const promise = this.axiosInstance?.get(url, config);
        
        if (_successProcess && _errorProcess)
            return this.applyProcesses<O>(promise, _successProcess, _errorProcess);

        return promise;
    };

    post = <O, I>(
        url: string,
        data: I,
        config?: AxiosRequestConfig,
        _successProcess?: <I>(data: I, status: number) => O,
        _errorProcess?: <T>(error: T) => void
    ) => {
        const promise = this.axiosInstance?.post(url, data, config);
        
        if (_successProcess && _errorProcess)
            return this.applyProcesses<O>(promise, _successProcess, _errorProcess);

        return promise;
    };

    put = <O, I>(
        url: string,
        data: I,
        config?: AxiosRequestConfig,
        _successProcess?: <I>(data: I, status: number) => O,
        _errorProcess?: <T>(error: T) => void
    ) => {
        const promise = this.axiosInstance?.put(url, data, config);
        
        if (_successProcess && _errorProcess)
            return this.applyProcesses<O>(promise, _successProcess, _errorProcess);

        return promise;
    };

    delete = <O,>(
        url: string,
        config?: AxiosRequestConfig,
        _successProcess?: <I>(data: I, status: number) => O,
        _errorProcess?: <T>(error: T) => void
    ) => {
        const promise = this.axiosInstance?.delete(url, config);

        
        if (_successProcess && _errorProcess)
            return this.applyProcesses<O>(promise, _successProcess, _errorProcess);

        return promise;
    };

    abort = () => {
        console.trace("Show me");
        this.abortController.abort();
    }
}

export default HttpService;
