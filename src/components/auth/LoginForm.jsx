'use client'

import React from 'react';
import {object} from "yup";
import {Field, Form} from "formik";
import {useTranslation} from "react-i18next";

import {Button, FormikLabel, FormikWrapper} from "../../ui";
import {formFieldReducer, reduceTextToLocalizations} from "../../helpers/utils";
import validationSchemes from "../../constants/validationSchemes";
import {MAX_EMAILS} from "../../constants/validationRules";

import styles from './index.module.css';
import StorageService from "../../service/StorageService";
import {SESSION, USER} from "../../constants/storageKeys";
import AuthService from "../../service/AuthService";

const form = {
    login: { label: 'EMAIL', placeholder: 'ENTER EMAIL' },
    password: { label: 'PASSWORD', placeholder: 'ENTER PASSWORD' },
}

const formFields = formFieldReducer(form);

const INITIAL_VALUES = {
    [formFields.login.name]: '',
    [formFields.password.name]: '',
}

const validationSchema = object({
    [formFields.login.name]: validationSchemes.email,
    [formFields.password.name]: validationSchemes.password,
})

const handlerLogin = values => {
    return AuthService.login(values)
        .then(data => {
            const { token, user } = data;
            StorageService.setItem(USER, user);
            StorageService.setItem(SESSION, {token});

            return user
        })
}
const LoginForm = () => {
    const {t} = useTranslation();

    return (
        <FormikWrapper
            onSubmit={values => handlerLogin(values)
                .then(user => {
                    setState(user)
                    // navigate(`/${featuresMap[user?.role?.features[0]?.id]}`)
                })
            }
            initialValues={INITIAL_VALUES}
            validationSchema={validationSchema}
        >
            {({form, formClassName, formLabelName, FormErrorLocal}) => {
                const { handleSubmit, isSubmitting } = form
                return (
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.form__title}>{t('LOGIN')}</div>

                        <div className={styles.form__group}>
                            <FormikLabel
                                label={reduceTextToLocalizations(formFields.login.label, t)}
                                className={formLabelName(formFields.login.name)}
                            />
                            <Field
                                name={formFields.login.name}
                                placeholder={reduceTextToLocalizations(formFields.login.placeholder, t)}
                                className={formClassName(formFields.login.name)}
                                maxLength={MAX_EMAILS}
                            />
                            <FormErrorLocal name={formFields.login.name}/>
                        </div>
                        <div className={styles.form__group}>
                            <FormikLabel
                                label={reduceTextToLocalizations(formFields.password.label, t)}
                                className={formLabelName(formFields.password.name)}
                            />
                            <Field
                                name={formFields.password.name}
                                type={'password'}
                                placeholder={reduceTextToLocalizations(formFields.password.placeholder, t)}
                                className={formClassName(formFields.password.name)}
                            />
                            <FormErrorLocal name={formFields.password.name}/>
                        </div>

                        {/*<div className='flex justify-end mt-2 w-full'>*/}
                        {/*    <Link className={styles.redirect} to={`/${forgotPassword}`}>{t('FORGOT_PASSWORD')}</Link>*/}
                        {/*</div>*/}

                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            color='primary'
                            className={styles.form__button}
                        >
                            {t('SIGN_IN')}
                        </Button>
                    </Form>
                )
            }}
        </FormikWrapper>
    );
};

export default LoginForm;