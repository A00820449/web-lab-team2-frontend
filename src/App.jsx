import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";

const router = createBrowserRouter([{
    path: "/",
    element: <AppLayout/>,
    children: [
        {
            path: "home",
            element: <Home />
        },
        {
            path: "",
            element: <Placeholder/>
        }
    ],
    errorElement: <Navigate to="/"/>
}])

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}