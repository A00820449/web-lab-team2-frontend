import { CircularProgress, Container } from "@mui/material";
import { Fragment, useContext} from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../api";
import { AppContext } from "../App";
import MyAppBar from "../components/MyAppBar";

export default function AppLayout() {
    const ctx = useContext(AppContext)
    const {data: res, status} = useQuery("userInfo", async ()=> {return await getUserInfo(ctx.token)})
    console.log(status)
    
    let user = null

    if (!ctx.token) {

        console.log("No token found")
        return <Navigate to="/login"/>
    }

    if (status === "error") {
        console.log("User info error")
        ctx.setToken("")
    }

    if (status === "success") {
        user = res.data.info
    }

    return (
        <Fragment>
            <MyAppBar />
            {user? <Outlet context={{user: user}}/>: <Container sx={{textAlign: "center"}}><CircularProgress /></Container>}
        </Fragment>
    )
}