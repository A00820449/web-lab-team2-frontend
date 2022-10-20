import { Container, Button } from "@mui/material";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";

export default function UserPage() {
    const [redirect, setRedirect] = useState(false)
    const ctx = useContext(AppContext)
    const handleClick = () => {
        ctx.setToken("")
        setRedirect(true)
    }
    return (
        <Container>
            User page
            <Button onClick={handleClick}>Logout</Button>
            {redirect && <Navigate to="/"/>}
        </Container>
    )
}