import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Dashboard from './pages/Dashboard';
import NavBar from "./components/NavBar";
import Supply from "./pages/Supply"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
            <NavBar />
                <div style={{marginLeft: 240}}>
                    <Switch>
                        <Route path="/dashboard" exact >
                            <Dashboard />
                        </Route>
                        <Route path="/mpe_1gem" exact >
                            <Supply/>
                        </Route>
                        <Redirect to="/dashboard" />
                    </Switch>
                </div>
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