import {Outlet} from "react-router-dom";

export default function Nav() {
    const username = window.localStorage.getItem("username") || '';
    return <>

        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">Facegram</a>
                <div className="navbar-nav">
                    <a className="nav-link" href={`/profile/${username}`}>@{username}</a>
                    <a className="nav-link" href="/logout">Logout</a>
                </div>
            </div>
        </nav>

        <Outlet/>
    </>
}