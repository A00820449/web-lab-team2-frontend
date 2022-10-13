import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";

const router = createBrowserRouter([{
    path: "/",
    element: <Placeholder/>
},{
    path: "home",
    element: <Home />
},{
    path: "*",
    element: <Navigate to="/" />
}])

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}