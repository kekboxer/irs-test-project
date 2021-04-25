import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Main from './pages/Main';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/main" exact >
                    <Main />
                </Route>
                <Route path="/test" exact >
                    <div>Exact</div>
                </Route>
                <Redirect to="/main" />
            </Switch>
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