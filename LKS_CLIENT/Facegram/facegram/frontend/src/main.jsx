import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './bootstrap.css'
import './style.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoAuth from "./components/NoAuth.jsx";
import Auth from "./components/Auth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Logout from "./pages/logout.jsx";
import Nav from "./components/nav.jsx";
import Profile from "./pages/profile.jsx";
import CreatePost from "./pages/createPost.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/*no auth*/}
                <Route element={<NoAuth/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>

                {/*auth*/}
                <Route element={<Auth/>}>
                    <Route element={<Nav/>}>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/profile/:username'} element={<Profile/>}/>
                        <Route path={'/create-post'} element={<CreatePost/>}/>
                    </Route>

                    <Route path={'/logout'} element={<Logout/>}/>
                </Route>

                <Route path={'/notFound'}/>
                <Route path={'/forbidden'}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
