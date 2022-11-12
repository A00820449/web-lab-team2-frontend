import { Container, Typography, Link, Avatar, Box, TextField, Grid, Button, Alert } from "@mui/material";
import { Link as RouterLink, Navigate, useSearchParams } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { getUserToken } from "../api";

export default function Login() {
    const [disableButton, setDisableButton] = useState(false)
    const [errmsg, setErrmsg] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [searchParams,] = useSearchParams()
    const ctx = useContext(AppContext)
    const successfulRegister = !!searchParams.get("successfulRegister")
    /**
     * @param {Event} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisableButton(true)
        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")
        
        let res
        try {
            res = await getUserToken(username, password)
        }
        catch(e) {
            setDisableButton(false)
            if (e.response) {
                setErrmsg(e.response.data.error)
                return
            } 
            setErrmsg(e.toString())
            return
        }

        ctx.setToken(res.data.token)

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to="/app/home"/>
    }

    return (
        <Container maxWidth="xs">
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8}}>
                {successfulRegister && <Alert severity={"success"}>Sign up succesful. Please log in.</Alert>}
                {errmsg && <Alert severity={"error"}>{errmsg}</Alert>}
                <Avatar>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component={'h1'} variant={"h4"}>
                    Log in
                </Typography>
                <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus/>
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={disableButton}>
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/">Go Back</Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}