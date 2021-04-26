import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Main from './pages/Main';
import NavBar from "./components/NavBar";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
            <NavBar />
                <div style={{marginLeft: 240}}>
                    <Switch>
                        <Route path="/main" exact >
                            <Main />
                        </Route>
                        <Route path="/mpe_1gem" exact >
                            <div>Exact</div>
                        </Route>
                    </Switch>
                </div>
                <Redirect to="/main" />
            </>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to="" />
            </Switch>
        )
    }
}