import { Container, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../App";

export default function UserPage() {
    const ctx = useContext(AppContext)
    const handleClick = () => {
        ctx.setToken("")
    }
    return (
        <Container>
            <Typography>User page</Typography>
            <Button onClick={handleClick}>Logout</Button>
        </Container>
    )
}