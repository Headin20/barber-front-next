import React from 'react';
import PropTypes from "prop-types";

import styles from './index.module.css'
import { noOperations, joinClassNames } from '../../helpers/utils';

const colorScheme = {
    green: styles.btn__green,
    danger: styles.btn__danger,
    primary: styles.btn__primary,
    link: styles.btn__link,
    default: styles.btn__default,
}

const Button = (
    {
        className,
        onClick = noOperations,
        disabled = false,
        type = 'button',
        color = 'default',
        children
    }) => {

    const scheme = colorScheme[color] || styles.btn__default

    return (
        <button
            className={joinClassNames(styles.btn, scheme, className)}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['submit', 'reset', 'button']),
    color: PropTypes.oneOf(['green', 'danger', 'default', "primary", 'link'])
}

Button.defaultProps = {
    type: 'button',
    color: 'default'
}

export default Button;