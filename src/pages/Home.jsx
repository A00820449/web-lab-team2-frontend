import * as React from "react"
import { Container, Typography } from "@mui/material";
import MyAppBar from "../components/MyAppBar"

export default function Home() {
    return (
        <React.Fragment>
            <MyAppBar />
            <Container>
                <Typography>
                    Home
                </Typography>
            </Container>
        </React.Fragment>
    )
}