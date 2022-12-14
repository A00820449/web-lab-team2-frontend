import { Fragment, useContext, useEffect} from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../api";
import { AppContext } from "../App";
import LoadingOverlay from "../components/LoadingOverlay";
import MyAppBar from "../components/MyAppBar";

export default function AppLayout() {
    const ctx = useContext(AppContext)
    const {data: res, status, refetch} = useQuery("userInfo", async ()=> {return await getUserInfo(ctx.token)})
    console.log(status)
    

    useEffect(()=>{
        if (status === "error") {
            console.log("User info error")
            ctx.setToken("")
        } else if (status === "success") {
            ctx.setUser(res.data.info)
        }
    },[status, res, ctx])

    if (!ctx.token) {

        console.log("No token found")
        return <Navigate to="/login"/>
    }

    return (
        <Fragment>
            <MyAppBar />
            {ctx.user? <Outlet context={{refetch: refetch}}/>: <LoadingOverlay/>}
        </Fragment>
    )
}