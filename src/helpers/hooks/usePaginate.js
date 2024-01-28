import {useMemo} from "react";
import {noAsyncOperation} from "../utils";
import {DEFAULT_LIMIT, DEFAULT_OFFSET} from "../../constants/api";

export const usePaginate = (paginate = {}, loadData = noAsyncOperation) => {
    const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET, totalRecords = 0 } = paginate;

    const currentPage = useMemo(() => Math.floor(offset / limit), [offset]);

    const totalPage = useMemo(() => Math.ceil(totalRecords / limit), [totalRecords, limit]);

    const numberFirstCurrenItem = useMemo(() => currentPage * limit + 1, [currentPage, limit])

    const numberLastCurrentItem = useMemo(() => {
        const lastElement = (currentPage + 1) * limit;
        return totalRecords < lastElement ? totalRecords : lastElement
    }, [currentPage, totalRecords, limit])

    const onPageChange = ({ selected }) => loadData({ ...paginate, limit, offset: selected * limit });

    return {currentPage, totalPage, numberFirstCurrenItem, numberLastCurrentItem, onPageChange}
}