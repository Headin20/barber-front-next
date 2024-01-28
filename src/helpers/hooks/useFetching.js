import {useCallback, useState} from "react";
import {noAsyncOperation} from "../utils";

export const useFetching = (request = noAsyncOperation, startLoading = true) => {
    const [isLoading, setIsLoading] = useState(startLoading);

    const getData = useCallback(params => {
        setIsLoading(true);
        return request(params).finally(() => setIsLoading(false))
    }, []);

    return { isLoading, getData }
}