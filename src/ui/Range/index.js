import React, {useEffect, useState} from 'react';
import Slider  from 'rc-slider';
import isEqual from 'lodash.isequal';

import 'rc-slider/assets/index.css';
import './index.css';

import {onInputOnlyNumber} from "../../helpers/utils/regExp";
import {noOperations} from "../../helpers/utils";

const Range = ({
                   min = 1,
                   max = 1000,
                   label = '-',
                   length = 5,
                   defaultValue = [min, max],
                   onChange = noOperations,
               }) => {
    const [value, setValue] = useState(defaultValue);
    const [tmpValue, setTmpValue] = useState(defaultValue);

    const handleChange = newValue => {
        setValue(() => newValue);
        setTmpValue(() => newValue);
    };

    const updateManualValues = () => {
        if (isEqual(tmpValue, value)) return;

        if ( tmpValue[0] === undefined) {
            tmpValue[0] = min
        }

        if (tmpValue[1] === undefined) {
            tmpValue[1] = min
        }

        const newValues = tmpValue[0] <= tmpValue[1]
            ? tmpValue
            : [...tmpValue].reverse();

        setValue(() => newValues);
        if (tmpValue[0] !== value[0]) setTmpValue(() => newValues);
    };

    const handleChangeMin = event => {
        let targetValue = parseInt(event.target.value, 10);

        if (isNaN(targetValue)) {
            targetValue = undefined;
        }

        if (targetValue < min) {
            targetValue = min;
        }

        setTmpValue([targetValue, tmpValue[1]])
    }

    const handleChangeMax = event => {
        let targetValue = parseInt(event.target.value, 10);

        if (isNaN(targetValue)) {
            targetValue = undefined;
        }

        if (targetValue > max) {
            targetValue = max;
        }

        setTmpValue([tmpValue[0], targetValue]);
    }

    useEffect(() => {
        onChange(value)
    }, [value])

    return (
        <div className="filter-range-item">
            <div className="slider-block">
                <Slider
                    range
                    defaultValue={value}
                    value={value}
                    onChange={handleChange}
                    className="filter-slider"
                    min={min}
                    max={max}
                />
            </div>
            <div className="input-block">
                <input
                    value={tmpValue[0]}
                    maxLength={length}
                    className="input-slider"
                    onInput={onInputOnlyNumber}
                    onChange={handleChangeMin}
                    onBlur={updateManualValues}
                />
                <span className='mx-4'>{label}</span>
                <input
                    value={tmpValue[1]}
                    maxLength={length}
                    className="input-slider-second"
                    onInput={onInputOnlyNumber}
                    onChange={handleChangeMax}
                    onBlur={updateManualValues}
                />
            </div>
        </div>
    );
};

export default Range;