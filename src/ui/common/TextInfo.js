import React from 'react';
import {joinClassNames} from "../../helpers/utils";

const TextInfo = ({ label, value, className, valueClassName = 'truncate' }) => {
    return (
        <div className={joinClassNames('flex flex-col', className)}>
            <div className='text-md font-medium'>{label}</div>
            <div className={joinClassNames('text-lg mt-4', valueClassName)}>{value}</div>
        </div>
    );
};

export default TextInfo;