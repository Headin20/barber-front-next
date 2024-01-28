import React from 'react';
import {onInputOnlyNumber} from "../../helpers/utils/regExp";

const InputNumber = ({ ...props }) => {
    return (
        <input
            {...props}
            onInput={onInputOnlyNumber}
        />
    );
};

export default InputNumber;