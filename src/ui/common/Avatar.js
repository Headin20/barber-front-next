import React from 'react';
import Image from "next/image";

import {joinClassNames} from "../../helpers/utils";

import styles from './common.module.css'

const Avatar = ({ url, style={}, className }) => {
    return (<Image
            style={style}
            src={url}
            className={joinClassNames(styles.avatar, className)}
            alt="avatar"
        />);
};

export default Avatar;