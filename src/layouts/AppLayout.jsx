import { Fragment, useContext, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../App";
import MyAppBar from "../components/MyAppBar";

export default function AppLayout() {
    const ctx = useContext(AppContext)
    const [user, setUser] = useState(null)
    const [redirect, setRedirect] = useState(false)

    useEffect(
        ()=>{
        const f = async () => {
            const url = new URL(ctx.apiURL)
            url.pathname = "/users/info"
            const res = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${ctx.token}`
                }
            })
            const data = await res.json()
            if (res.status === 200)
                setUser(data.info.name)
            else
                throw new Error(`Status: ${res.status}`)
        }
        f().catch((e)=>{
            console.log(e)
            ctx.setToken("")
            setRedirect(true)
        })
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
    return (
        <Fragment>
            <MyAppBar />
            {user ? <Outlet context={{user: user}}/> : "loading..."}
            {redirect && <Navigate to="/login"/>}
        </Fragment>
    )
}