import {useState} from "react";
import {noOperations} from "../utils";
import {DEFAULT_OFFSET} from "../../constants/api";
import moment from "moment";

export const useFilter = (
    defaultFilter,
    queryName = 'query'
) => {
    const [filters, setFilters] = useState(defaultFilter);

    const updateFilters = values => setFilters(filter => ({...filter, ...values}));

    const handleSingleChange = (event, field, callback = noOperations) => {
        setFilters({...filters, offset: DEFAULT_OFFSET, [field]: event});
        callback(field, false);
    }

    const handleDateChange = ([startDate, endDate], callback = noOperations) => {
        setFilters(filters => ({
            ...filters,
            offset: DEFAULT_OFFSET,
            startDate: startDate ? moment(startDate).format() : undefined,
            endDate: endDate ? moment(endDate).format() : undefined,
        }));
        callback();
    }

    const handleInputChange = query => setFilters({
        ...filters,
        offset: DEFAULT_OFFSET,
        [queryName]: query || undefined
    });

    return {
        filters,
        setFilters,
        updateFilters,
        handleDateChange,
        handleSingleChange,
        handleInputChange,
    }
}