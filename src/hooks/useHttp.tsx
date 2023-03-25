import { useService } from 'components/providers/Service';
import { useEffect, useState } from 'react';
import HttpService from 'services/http';

interface HttpHookResponse<O, I> {
    call: (
        query: (serv: HttpService, args?: I) => Promise<any>,
        args: I
    ) => void;
    response: O;
    loading: boolean;
    error: any;
}

/**
 * Check if a service is available
 * @param name The service name
 * @returns True if the service is available
 */
export const useServiceEnabled = (name: string) => {
    const service = useService(name);

    return !!service;
};

/**
 * Http requests timeout
 */
export const httpTimeout = 5000;

/**
 * Service available checking timeout
 */
const checkingTimeout = 2000;

/**
 * Hook which allow to use an http service to make request
 * @param serviceName The name of the service which must be used
 * @param defaultValue The initial value of the request response
 * @returns The request caller, the loading indicator, the response and the error
 */
const useHttp = <O, I>(
    serviceName: string,
    defaultValue: O
): HttpHookResponse<O, I> => {
    const [response, setResponse] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [serviceChecking, setServiceChecking] = useState(false);

    /**
     * The request inputs
     */
    const [inputs, setInputs] = useState<I>();
    /**
     * The request query
     */
    const [request, setRequest] =
        useState<(serv: HttpService, args: I) => Promise<any>>();

    /**
     * The service to call
     */
    const service = useService(serviceName);

    useEffect(() => {
        if (service && serviceChecking) {
            setServiceChecking(false);
            if (request) {
                call(request, inputs);
            }
        }

        return () => {
            if (service && loading) service.abort();
        };
    }, [service]);

    /**
     * Abort the service request if exist else throw a service unavailable error
     */
    const abortCall = () => {
        if (service && loading) {
            service.abort();
        }
    };

    useEffect(() => {
        let timeout: string | number | NodeJS.Timeout | undefined;
        if (loading) {
            timeout = setTimeout(abortCall, httpTimeout);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [loading]);

    useEffect(() => {
        let timeout: string | number | NodeJS.Timeout | undefined;
        if (serviceChecking) {
            timeout = setTimeout(() => {
                throw `${serviceName} service not installed`;
            }, checkingTimeout);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [serviceChecking]);

    /**
     * Handle request query response
     * @param query The query response
     */
    const callAPI = (query: Promise<any>) => {
        setLoading(true);
        query
            .then((res) => {
                if (res) setResponse(res);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /**
     * Launch to request if the needed service is available else store if for launch if later
     * @param query The request query
     * @param args The request data
     */
    const call = (
        query: (serv: HttpService, args?: I) => Promise<any>,
        args?: I
    ) => {
        if (service) {
            callAPI(query(service, args));
        } else {
            setServiceChecking(true);
            setInputs(args);
            setRequest(() => query);
        }
    };

    return {
        call,
        response,
        loading: loading || serviceChecking,
        error
    };
};

export default useHttp;
