import { useState } from 'react';

interface HttpHookResponse<O> {
    call: (promise: Promise<any>) => void;
    response: O;
    loading: boolean;
    error: any;
}
const useHttp = <O,>(defaultValue: O): HttpHookResponse<O> => {
    const [response, setResponse] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const call = (query: Promise<any>) => {
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

    return {
        call,
        response,
        loading,
        error
    };
};

export default useHttp;
