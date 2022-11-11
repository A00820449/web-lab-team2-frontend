import { Fragment, useContext} from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../api";
import { AppContext } from "../App";
import MyAppBar from "../components/MyAppBar";

export async function loader(...args) {
    //console.log("loader args:", args)    
}

export default function AppLayout() {
    const ctx = useContext(AppContext)
    const {data, status} = useQuery("userInfo", async ()=> {return await getUserInfo(ctx.token)})
    console.log(status, data)
    
    let user = null

    if (!ctx.token || status === "error") {
        return <Navigate to="/login"/>
    }

    if (status === "success") {
        if (data.data.error) {
            ctx.setToken("")
            return <Navigate to="/login"/>
        }
        user = data.data.info
    }

    return (
        <Fragment>
            <MyAppBar />
            {user? <Outlet context={{user: user}}/>: "Loading"}
        </Fragment>
    )
}