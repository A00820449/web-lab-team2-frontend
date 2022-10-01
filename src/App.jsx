import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Placeholder from "./pages/Placeholder";

const router = createBrowserRouter([{
    path: "/",
    element: <Placeholder/>
}])

export default function App() {
    return (
        <RouterProvider router={router}/>
    )
}