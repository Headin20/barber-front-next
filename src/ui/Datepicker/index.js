import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {useTranslation} from "react-i18next";

import {noOperations} from "../../helpers/utils";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const Datepicker = (
    {
        callback = noOperations,
        dateRange = [null, null],
        placeholder = 'SELECT_DATE',
        className
    }) => {
    const {t} = useTranslation()
    const [date, setDateRange] = useState(dateRange);
    const [startDate, endDate] = date;

    return (
        <DatePicker
            onChange={date => {setDateRange(date); callback(date)}}
            startDate={startDate}
            endDate={endDate}
            placeholderText={t(placeholder)}
            className={className}
            selectsRange
        />
    );
};

export default Datepicker;