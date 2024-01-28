import {toast} from "react-toastify";
import axios from "axios";
import { parse, stringify } from 'qs';

import StorageService from "./StorageService";
import {SESSION} from "../constants/storageKeys";

export const AUTH = "Authorization";
export const SKIP_AUTH = "X-Skip-Authorization";

const interceptorsRequest = [
    response => {
        const { [SKIP_AUTH]: skipAuth, ...restHeaders } = response.headers;

        if ( !skipAuth ) {
            restHeaders[AUTH] =  'Bearer ' + StorageService.getItem(SESSION)
        }

        response.headers = restHeaders;
        return response;
    },
    error => Promise.reject(error)
]

const errorInterceptorResponse = [
    response => (response.data),
    error => {
        let errorMessage = 'Server Error';
        const { response } = error;

        if (response && response.data) {
            errorMessage = response.data.message;
        }

        if (!response?.data?.skipNotification) {
            toast.error(
                errorMessage,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            )
        }
        return Promise.reject(error);
    }
];

export default class HttpService {
    static get api () {
        return { common: process.env.NEXT_PUBLIC_API_BASE};
    }

    static createInstance(...args) {
        return axios.create(...args);
    }

    constructor(args = {
        baseURL: `${HttpService.api.common}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        paramsSerializer: {
            encode: parse,
            serialize: stringify,
        },
    })
    {
        this.instance = HttpService.createInstance(args);
        this.instance.interceptors.response.use(...errorInterceptorResponse);
        this.instance.interceptors.request.use(...interceptorsRequest);

        this.offset = 'Pagination.Offset';
        this.limit = 'Pagination.Limit';
    }

    get(...args) {
        return this.instance.get(...args);
    }

    post(...args) {
        return this.instance.post(...args);
    }

    put(...args) {
        return this.instance.put(...args);
    }

    patch(...args) {
        return this.instance.patch(...args);
    }

    delete(...args) {
        return this.instance.delete(...args);
    }
}