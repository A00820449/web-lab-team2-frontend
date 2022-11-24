import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

/**
 * 
 * @param {{
 *      card:{name: string,scientific_name: string,description: string,image_url: string,rarity: string,card_image_url: string},
 *      quantity: number,
 *      callback: React
 * }} param0 
 * @returns 
 */
export default function CardInCol({card, quantity, callback}) {
    quantity = quantity ?? 0

    const handleClick = () => {
        callback(card)
    }


    if (quantity <= 0) {
        return null
    }

    return (
    <Grid item xs={12} sm={6} md={6} padding>
        <Box sx={{backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "20px"}} onClick={handleClick}>
            <Box>
                <img src={card.card_image_url} alt={card.scientific_name} style={{maxHeight: "400px", margin: "0 auto", display: "block"}} />
            </Box>
            <Typography variant={"h4"} sx={{textAlign: "center"}}>
                <CloseIcon/>{quantity}
            </Typography>
        </Box>
    </Grid>
    )
}