import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";

const router = createBrowserRouter([{
    path: "/",
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
        },
        {
            path: "*",
            element: <div>404</div>
        }
    ],
}])

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}