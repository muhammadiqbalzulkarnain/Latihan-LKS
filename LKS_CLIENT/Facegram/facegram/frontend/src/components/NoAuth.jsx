import {Outlet} from "react-router-dom";

export default function NoAuth() {
    const token = window.localStorage.getItem('token')
    if (token) {
        window.location.href = '/'
    }
    return <Outlet/>
}