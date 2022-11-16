import * as React from "react"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function Home() {
    const {user} = useOutletContext()
    return (
        <React.Fragment>
            <Container>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Home
            </Typography>
                <h3>Bienvenido, {user}</h3>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid  xs={12} sm={6} md={4}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        sx={{
                        // 16:9
                        pt: '56.25%',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Mi coleccion
                        </Typography>
                        <Typography>
                        Ver tarjetas adquiridas.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Go</Button>
                    </CardActions>
                    </Card>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        sx={{
                        // 16:9
                        pt: '56.25%',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Catalogo
                        </Typography>
                        <Typography>
                        Ver todas las tarjetas disponibles.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Go</Button>
                    </CardActions>
                    </Card>
                    <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Ver amigos
                    </Typography>
                    <Typography>
                     Ver y administrar amigos.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Go</Button>
                  </CardActions>
                </Card>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        sx={{
                        // 16:9
                        pt: '56.25%',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Abrir paquete
                        </Typography>
                        <Typography>
                        Abrir paquete y descubrir tarjetas.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Go</Button>
                    </CardActions>
                    </Card>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        sx={{
                        // 16:9
                        pt: '56.25%',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Cambiar tarjetas
                        </Typography>
                        <Typography>
                        Cambio de tarjetas con otros usuarios.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Go</Button>
                    </CardActions>
                    </Card>
               </Grid>
            </Container>
            
        </React.Fragment>
    )
}