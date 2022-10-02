import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
        <RouterProvider router={router}/>
    )
}