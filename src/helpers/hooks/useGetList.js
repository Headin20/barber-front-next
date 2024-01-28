import {useCallback, useEffect, useState} from "react";
import {fetchingAllInfo, noAsyncOperation, noChanges} from "../utils";
import {DEFAULT_LIMIT, DEFAULT_OFFSET} from "../../constants/api";

export const useGetList = (
    {
        provider = noAsyncOperation,
        transformer = noChanges,
        updater,
        filter = { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET }
    }) => {

    const [list, setList] = useState([]);
    const [fullData, setFullData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({ limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET });

    const loadData = useCallback((filters) => {
        setIsLoading(true)
        provider(filters)
            .then(data => {
                setFullData(data)
                return data
            })
            .then(({data, offset, limit, totalRecords}) => {
                setFilters(f => ({ ...f, ...filters, offset, limit, totalRecords }))
                return transformer(data)
            })
            .then(setList)
            .finally(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        loadData({ ...filters, ...filter })
    }, [updater, loadData, filter])

    const loadAllInfo = useCallback(( filters = {} ) => {
        return fetchingAllInfo({provider, filters, transformer})
            .then(data => setList(data))
            .finally(() => setIsLoading(false))
    }, [loadData])

    return {
        list,
        fullData,
        isLoading,
        pagination: filters,
        loadData,
        setList,
        loadAllInfo,
    }
}