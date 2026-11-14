import { Outlet } from "react-router-dom";

export default function Auth() {
    const token = window.localStorage.getItem('token')

    if (!token) {
        window.location.href = './login'
    }
    
    return <Outlet />
}