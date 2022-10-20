import { Container, Typography, Link, Avatar, Box, TextField, Grid, Button, Alert } from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function Login() {
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
        
        const url = new URL(ctx.apiURL)
        url.pathname = "/users/auth"
        console.log(formData.get("username"), formData.get("password"))
        let res
        try {
            res = await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: formData.get("username"), password: formData.get("password")})
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

        console.log(data.token)
        setErrmsg("")
        ctx.setToken(data.token)
        setRedirect(true)
    }
    return (
        <Container maxWidth="xs">
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8}}>
                {errmsg && <Alert severity={"error"}>{errmsg}</Alert>}
                <Avatar>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component={'h1'} variant={"h4"}>
                    Login
                </Typography>
                <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus/>
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={disableButton}>
                        Sign In
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
            {redirect && <Navigate to="/app/home"/>}
        </Container>
    )
}