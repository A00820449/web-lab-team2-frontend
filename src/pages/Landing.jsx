import { Container, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Landing() {
    return (
        <Container>
            <Typography>Landing Page</Typography>
            <Link component={RouterLink} to="/app/home">Enter app</Link>
        </Container>
    )
}