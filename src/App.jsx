import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useLocalStorage } from "./hooks";
import AppLayout from "./layouts/AppLayout";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PackPage from "./pages/PackPage";
import Placeholder from "./pages/Placeholder";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

export const apiURL = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:3000/"

export const AppContext = React.createContext({token: "", setToken: null})

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
            path: "packs",
            element: <PackPage/>
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
    const [JWT, setJWT] = useLocalStorage("token", "")

    return (
        <AppContext.Provider value={{token: JWT, setToken: setJWT}}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AppContext.Provider>
    )
}