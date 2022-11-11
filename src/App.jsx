import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Placeholder from "./pages/Placeholder";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

export const apiURL = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost3000"
const token = localStorage.getItem("token") || ""
export const AppContext = React.createContext({apiURL: "", token: "", setToken: null})

export const queryClient = new QueryClient()

const router = createBrowserRouter([{
    path: "/",
    element: <Landing/>
},{
    path: "/app",
    element: <AppLayout/>,
    children: [
        {
            index: true,
            element: <Navigate to="home" />
        },
        {
            path: "home",
            element: <Home />
        },
        {
            path: "placeholder",
            element: <Placeholder/>
        },{
            path: "user",
            element: <UserPage/>
        },{
            path: "*",
            element: <Navigate to="home" />
        }
    ],
},{
    path: "/login",
    element: <Login/>
},{
    path: "/signup",
    element: <SignUp/>
},{
    path: "*",
    element: <Error404/>
}])

export default function App() {
    const [JWT, setJWT] = useState(token)
    /**
     * @param {string} token 
     */
    const setToken = (token) => {
        setJWT(token)
        localStorage.setItem("token", token)
    }
    return (
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{apiURL: apiURL, token: JWT, setToken: setToken}}>
                <RouterProvider router={router} />
            </AppContext.Provider>
            
        </QueryClientProvider>
    )
}