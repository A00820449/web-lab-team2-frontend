import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCollection } from "../api";
import { AppContext } from "../App";
import CardInCol from "../components/CardInCol";

export default function Collection() {
    const ctx = useContext(AppContext)
    const {data: res, status} = useQuery("collection", async () => await getCollection(ctx.token))
    const [infocard, setInfoCard] = useState(null)

    let arr = []
    if (status === "success") {
        arr = res.data
    }

    console.log(arr)
    
    return (
        <>
        <Container>
            <Grid container>
                {arr.map((cardInCol, i) => <CardInCol key={i} card={cardInCol.card} quantity={cardInCol.quantity} callback={setInfoCard}/>)}
            </Grid>
        </Container>
        {infocard && <InfoCard card={infocard} callback={()=>setInfoCard(null)}/>}
        </>
    )
}

function InfoCard({card, callback}) {
    return (
    <Box sx={{ backgroundColor: 'rgba(0,0,0,0.8)', color: "white", overflowX: "auto", zIndex: (theme) => theme.zIndex.drawer + 1, position: "fixed", top: 0, bottom: 0, left: 0, right: 0, paddingTop: "min(100px, 10vw)"}} onClick={callback}>
        <Container>
            <Typography variant="h2" sx={{textAlign: "center"}}>
                {card.name}
            </Typography>
            <Box>
                <img src={card.image_url} alt={card.scientific_name} style={{width: "min(500px, 80vw)", margin: "0 auto", display: "block"}} />
            </Box>
            <Typography variant="h4" sx={{fontStyle: "italic"}}>
                {card.scientific_name}
            </Typography>
            <Typography variant="p">
                {card.description}
            </Typography>
        </Container>
    </Box>
    )
}