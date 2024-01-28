import moment from "moment";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const MIN_DATE = moment(0).utc(false).format();
const TODAY_DATE = moment().utc(false).startOf('d').format();

export {
    DEFAULT_LIMIT,
    DEFAULT_OFFSET,
    MIN_DATE,
    TODAY_DATE
}