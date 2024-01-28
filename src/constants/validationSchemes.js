import * as yup from 'yup'
import {NOT_EMAIL, FIELD_NOT_SPACES_ONLY, IS_REQUIRED, ARRAY_MIN, DATE_RANGE} from "./validationErrorMessages";
import {MIN_LENGTH} from "./validationRules";

export default {
    //USER
    address: yup.string()
        .trim()
        .min(MIN_LENGTH, FIELD_NOT_SPACES_ONLY('Address'))
        .required(IS_REQUIRED),
    email: yup.string()
        .email(NOT_EMAIL)
        .trim()
        .min(MIN_LENGTH, FIELD_NOT_SPACES_ONLY('Email'))
        .required(IS_REQUIRED),
    password: yup.string()
        .trim()
        .min(MIN_LENGTH, FIELD_NOT_SPACES_ONLY('Password'))
        .required(IS_REQUIRED),
    role: yup.number().required(IS_REQUIRED),

    //Super Admin

    name: yup.string()
        .trim()
        .min(MIN_LENGTH, FIELD_NOT_SPACES_ONLY('Name'))
        .required(IS_REQUIRED),
    description: yup.string()
        .trim()
        .min(MIN_LENGTH, FIELD_NOT_SPACES_ONLY('Description'))
        .required(IS_REQUIRED),

    //ROLES
    availableFeatures: yup.array()
        .min(MIN_LENGTH, ARRAY_MIN)
        .required(IS_REQUIRED),

}