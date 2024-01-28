import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {useTranslation} from "react-i18next";

import styles from './index.module.css'
import {joinClassNames} from "../../helpers/utils";

const CustomDropzone =
    ({
         onFileDrop,
         acceptedFiles = [],
         className,
         options,
     }) => {
        const {t} = useTranslation();
        const onDrop = useCallback(onFileDrop, []);
        const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, ...options});

        const files = acceptedFiles.map(file => (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        ));

        return (
            <section>
                <div {...getRootProps({className: joinClassNames(className, styles.dropzone, isDragActive && styles.draggable)})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    <h4 className='mt-2'>{t('FILES')}</h4>
                    <ul>{files}</ul>
                </aside>
            </section>
        )
    }

export default CustomDropzone;