import { Typography, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

/**
 * @param {{card: any}} param0 
 * @returns 
 */
export default function AlbumCard({card}) {
    return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image={card.image_url}
          alt="random" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {card?.name}
          </Typography>
          <Typography>
            {card?.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    )
  }