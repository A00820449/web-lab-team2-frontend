import * as React from "react"
import { Container, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function Home() {
    const {user} = useOutletContext()
    return (
        <React.Fragment>
            <Container>
                <Typography>
                    Home
                </Typography>
                <p>Hello, {user.name}</p>
            </Container>
        </React.Fragment>
    )
}