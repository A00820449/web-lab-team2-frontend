import { Button, Container, Box, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { openPack } from "../api";
import { AppContext } from "../App";
import Card from "./Card";

export default function PackPage({refect}) {
    const [opening, setOpening] = useState(false)
    const [cards, setCards] = useState([])
    const ctx = useContext(AppContext)
    const {refetch} = useOutletContext()

    const user = ctx.user

    const packs = (user.packQuantity ?? 0)
    const nopacks = packs <= 0

    const clickHandler = async () => {
        setCards([])
        setOpening(true)
        
        const res = await openPack(ctx.token)
        
        setCards(res.data)
        refetch()
    }

    const callback = () => {
        setOpening(false)
        const newUser = Object.assign({}, ctx.user)
        ctx.setUser(newUser)
    }

    return (
    <>
    <Container>
        <Typography paddingY={2}>
            {!nopacks ? `${packs} packs avaiable!` : `No packs available :(`}
        </Typography>
        <Box>
            <Button variant="contained" disabled={nopacks || opening} onClick={clickHandler}>
                OPEN PACK
            </Button>
        </Box>
    </Container>
    {opening && <OpeningOverlay cards={cards} callback={callback} />}
    </>
    )
}

function OpeningOverlay({cards, callback}) {

    return (
        <Box sx={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowX: "auto", zIndex: (theme) => theme.zIndex.drawer + 1, position: "fixed", top: 0, bottom: 0, left: 0, right: 0, paddingTop: "100px"}} open={true} onClick={callback}>
            <Grid container justifyContent="center" alignContent="center">
                {cards.map((card, i)=> <Card key={i} card={card} />)}
            </Grid>
        </Box>
    )
}