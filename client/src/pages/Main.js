import React from "react";
import Axios from 'axios';
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

const Main = () => {
    const auth = useContext(AuthContext);
    const logout = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/api/auth/logout",
        })
            .then((res) => {
                auth.checkAuthentication();
        });
    }

    return (
        <div>
            <h6>MAIN</h6>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Main;