import { Backdrop, CircularProgress } from "@mui/material"

export default function LoadingOverlay() {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}