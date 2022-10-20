import { Container, Typography, Link, Avatar, Box, TextField, Grid, Button, Alert } from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function SignUp() {
    const [disableButton, setDisableButton] = useState(false)
    const [errmsg, setErrmsg] = useState("")
    const [redirect, setRedirect] = useState(false)
    const ctx = useContext(AppContext)
    /**
     * @param {Event} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisableButton(true)

        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")
        const password2 = formData.get("password2")
        const name = formData.get("name")

        if (password !== password2) {
            setErrmsg("Passwords do not match")
            setDisableButton(false)
            return
        }

        const url = new URL(ctx.apiURL)
        url.pathname = "/users/create"
        let res
        try {
            res = await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password, name})
            })
        }
        catch(e) {
            setErrmsg(e.toString())
            setDisableButton(false)
            return
        }

        let data
        try {
            data = await res.json()
        }
        catch(e) {
            setErrmsg(res.statusText)
            setDisableButton(false)
            return
        }

        if (res.status !== 200) {
            setErrmsg(data.error)
            setDisableButton(false)
            return
        }

        setErrmsg("")
        setRedirect(true)
    }
    return (
        <Container maxWidth="xs">
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8}}>
                {errmsg && <Alert severity={"error"}>{errmsg}</Alert>}
                <Avatar>
                    <CreateOutlinedIcon/>
                </Avatar>
                <Typography component={'h1'} variant={"h4"}>
                    Sign up
                </Typography>
                <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus/>
                    <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username"/>
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <TextField margin="normal" required fullWidth name="password2" label="Confirm password" type="password" id="password2" autoComplete="current-password"/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={disableButton}>
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/">Go Back</Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                {"Already have an account? Log in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {redirect && <Navigate to="/login?successfulRegister=true"/>}
        </Container>
    )
}