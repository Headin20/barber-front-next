'use client'

import React, {useEffect, useState} from 'react';
import {useDebounce} from "../../helpers/hooks";
import {joinClassNames} from "../../helpers/utils";

import styles from './index.module.css'

const LoadingIndicated = ({ children, isLoading, blurry = true, fixed = true}) => {
    const [spinner, setSpinner] = useState(false);
    const debounced = useDebounce(isLoading, 300);

    useEffect(() => {
        setSpinner(debounced);
    }, [debounced]);

    return (
        <div className={joinClassNames(styles.loading__indicated)}>
            <div className={ joinClassNames(styles.loading__indicator, !spinner && 'hidden') }>
                <div className={ joinClassNames(styles.loading, !fixed && 'absolute')}/>
            </div>
            <div className={ joinClassNames(spinner && blurry && styles.blurry) }>
                { children }
            </div>
        </div>
    );
};

export default LoadingIndicated;