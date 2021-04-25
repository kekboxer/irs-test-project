import React, { useState, useContext } from "react";
import Axios from 'axios';
import {AuthContext} from "../context/AuthContext";

function AuthPage() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const auth = useContext(AuthContext);
    const register = () => {
        Axios({
            method: "POST",
            data: {
                email: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/api/auth/register",
        }).then((res) => console.log(res));
    };
    const login = async () => {
        try{
           await Axios({
                method: "POST",
                data: {
                    email: loginUsername,
                    password: loginPassword,
                },
                withCredentials: true,
                url: "http://localhost:5000/api/auth/login",
            }).then(async(res)=> {
               auth.checkAuthentication()
           })
        } catch (e) {}

    };
    return (
        <div className="App">
            <div>
                <h1>Register</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button onClick={register}>Submit</button>
            </div>

            <div>
                <h1>Login</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>
        </div>
    );
}

export default AuthPage;
