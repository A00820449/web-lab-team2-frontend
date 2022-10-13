import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MyAppBar from "./components/MyAppBar";
import Placeholder from "./pages/Placeholder";

const router = createBrowserRouter([{
    path: "/",
    element: <Placeholder/>
},{
    path: "*",
    element: <Navigate to="/" />
}])

export default function App() {
    return (
        <React.Fragment>
            <MyAppBar/>
            <RouterProvider router={router}/>
        </React.Fragment>
    )
}