import React from 'react';
import {Field} from "formik";
import Select from "react-select";
import {getDeepValue, joinClassNames} from "../../helpers/utils";
import styles from "./index.module.css";

const FormikSelect = ({ name, options, className, ...rest }) => {
    return (
        <Field name={name} className={className}>
            {({ field, form }) => {
                const { setFieldValue, errors, touched } = form;
                const { value } = field;

                return (
                    <Select
                        {...rest}
                        id={name}
                        name={name}
                        className={joinClassNames(styles.select,
                            (getDeepValue(errors, name) && getDeepValue(touched, name)) && 'invalid')}
                        classNamePrefix="select"
                        value={options.find((option) => option.value === value)}
                        onChange={(option) => setFieldValue(name, option.value)}
                        onBlur={field.onBlur}
                        options={options}
                    />
                );
            }}
        </Field>
    );
};

export default FormikSelect;