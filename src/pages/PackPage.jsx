import { Button, Container, Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function PackPage() {
    const {user} = useOutletContext()

    const packs = user.packQuantity ?? 0
    const oneormore = packs > 0
    return (
    <Container>
        <Typography paddingY={2}>
            {oneormore ? `${packs} packs avaiable!` : `No packs available :(`}
        </Typography>
        <Box>
            <Button variant="contained" disabled={!oneormore}>
                OPEN PACK
            </Button>
        </Box>
    </Container>
    )
}