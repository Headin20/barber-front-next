'use client'

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";

import StorageService from "../../service/StorageService";
import {SESSION} from "../../constants/storageKeys";

const Layout = ({ children }) => {
    const { token } = StorageService?.getItem(SESSION);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token]);

    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;