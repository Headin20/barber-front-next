import React from 'react';
import {Formik} from "formik";
import {getDeepValue} from "../../helpers/utils";
import FormikHelper from "./FormikHelper";
import {LoadingIndicated} from "../index";

const FormikError = (
    {
        fieldName, errors, touched, needTouch = true
    }
) => {

    const error = getDeepValue(errors, fieldName);
    const isTouched = needTouch ? getDeepValue(touched, fieldName) : true ;

    return (
        <>
            { error && isTouched && (
                <div className='text-red-600 text-sm'>
                    {error}
                </div>
            )}
        </>
    )
}

const FormikWrapper = (
    {
        initialValues,
        initialErrors,
        onSubmit,
        validationSchema,
        enableReinitialize,
        children
    }
) => {
    return (
        <Formik
            initialValues={initialValues}
            initialErrors={initialErrors}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize={enableReinitialize}
        >
            {form => {
                const { errors, touched, isSubmitting } = form;
                const { formClassName, formLabelName } = new FormikHelper(errors, touched).createFunctions();

                const FormErrorLocal = ({name}) => (
                    <FormikError
                        fieldName={name}
                        errors={errors}
                        touched={touched}
                    />
                );

                return <LoadingIndicated isLoading={isSubmitting}>
                    {children({form, formClassName, formLabelName, FormErrorLocal})}
                </LoadingIndicated>
            }}
        </Formik>
    );
};

export default FormikWrapper;