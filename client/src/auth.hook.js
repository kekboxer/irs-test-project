import {useCallback, useEffect, useState} from "react";
import Axios from "axios";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const checkAuthentication =  useCallback( () => {
             Axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:5000/api/auth/user",
            }).then((res) => {
                if (res.data) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                setIsLoading(false);
            })
    }, [])

    useEffect(() => {
        checkAuthentication()
    }, [checkAuthentication])

    return { isAuthenticated, checkAuthentication, isLoading };
}