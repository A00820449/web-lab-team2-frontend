import { Grid } from "@mui/material";
import "./Card.css"

/**
 * 
 * @param {{
 *      card:{name: string,scientific_name: string,description: string,image_url: string,rarity: string,card_image_url: string}
 *      width: number?
 * }} param0 
 * @returns 
 */
export default function Card({card, width}) {
    width = width ?? 200
    return (
        <Grid item xs={12} sm={6} md={4}>
            <img className="rotatingCard" alt={card.scientific_name} src={card.card_image_url} style={{height: "400px", display: "block", margin: "0 auto"}} />
        </Grid>
    )
}