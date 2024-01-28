import React from 'react';
import styles from './index.module.css'

const FormikLabel = ({ className = styles.form__label, label}) => {
    return (
        <div className={className}>
            {label}
        </div>
    );
};

export default FormikLabel;