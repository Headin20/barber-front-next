import React from 'react';

import styles from './common.module.css'
import {joinClassNames} from "../../helpers/utils";

const ModalHeader = ({ children, className }) => {
    return (
        <div className={joinClassNames(styles.modal__header, className)}>
            {children}
        </div>
    );
};

export default ModalHeader;