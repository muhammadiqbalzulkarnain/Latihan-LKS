import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export default function NoAuth() {
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            window.location.href = '/homepage'
        }
    });

    return <Outlet />
}