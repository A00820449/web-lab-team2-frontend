import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MyAppBar from "../components/MyAppBar";

export default function AppLayout() {
    return (
        <Fragment>
            <MyAppBar />
            <Outlet />
        </Fragment>
    )
}