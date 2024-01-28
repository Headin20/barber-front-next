import React from 'react';
import {joinClassNames} from "../../helpers/utils";
import styles from "./index.module.css";

const Spinner = () => {
    return (
        <div className={styles.loading__indicator }>
            <div className={ joinClassNames(styles.loading, 'absolute')}/>
        </div>
    );
};

export default Spinner;