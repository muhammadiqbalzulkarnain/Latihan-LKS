import { Outlet } from 'react-router-dom';
import { useEffect } from "react";

export default function Auth() {
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            window.location.href = '/login'
        }
    });

    return <Outlet />
}