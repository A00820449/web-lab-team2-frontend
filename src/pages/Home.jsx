import * as React from "react"
//import Button from '@mui/material/Button';
//import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import { Box, Button, Container, Link, /*Grid, */Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import CountDown from "../components/CountDown";
import { useQuery } from "react-query";
import { getNextPack, getUserInfo, postClaimPack } from "../api";
import { useMutation } from "react-query";
import { useState, useEffect, useCallback } from "react";


/*const Sebas = <Container sx={{ py: 8 }} maxWidth="md">
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
</Container>*/

export default function Home() {
    const {user: ctxuser, token} = useContext(AppContext)
    const {data: packdata, status: packstatus, refetch: packrefetch} = useQuery("nextpack", getNextPack)
    const {data: usrdata, status: usrstatus, refetch: usrrefetch} = useQuery("userInfo", () => {return getUserInfo(token)})
    const mutation = useMutation({mutationFn: postClaimPack})
    const [user, setUser] = useState(null)
    const [pack, setPack] = useState(null)
    const countdownCallback = useCallback(()=>{
      packrefetch()
      usrrefetch()
    })

    useEffect(()=>{
      if (usrstatus === "success") {
        setUser(usrdata.data.info)
        console.log("updated user", usrdata.data.info)
      }
    },[usrstatus, usrdata])

    useEffect(()=>{
        if (packstatus === "success") {
          setPack({next: packdata.pack, time: packdata.time})
          console.log("updated pack", packdata)
        }
    },[packstatus, packdata])

    useEffect(()=>{
      if (mutation.isSuccess) {
        usrrefetch()
        packrefetch()
      }
    },[mutation.isSuccess, usrrefetch, packrefetch])

    const claimHandler = () => {
      mutation.mutate(token)
    }
    const countdowncallback = ()=>{
      usrrefetch()
      packrefetch()
    }

    const dispacks = user?.packQuantity || ctxuser.packQuantity || 0
    const disname = user?.name || ctxuser.name || ""
    const dislaspack = user?.lastFreePack || ctxuser?.lastFreePack || 0
    const disnextpack = pack?.next || Infinity
    let disnexttime = pack?.time || 0

    let canclaim = dislaspack + 1 < disnextpack
    if (canclaim) {
      disnexttime = 0
    }


    const packbutton = (
      <Box paddingY={2}>
        <Link component={RouterLink} to="/app/packs" sx={{textDecoration: false}}>
          <Button variant="contained">
            Open packs
          </Button>
        </Link>
      </Box>
    )

    return (
        <React.Fragment>
            <Container>
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Home
            </Typography>
            <Typography component={'h3'}>Welcome, {disname}.</Typography>
            <Typography>You have {dispacks} unopened packs.</Typography>
            {dispacks > 0 && packbutton}
            <Box>
              <Typography variant="h6">Time until next pack:</Typography>
              <CountDown time={disnexttime} callback={countdowncallback}/>
              <Box paddingY={2}>
                <Button variant="contained" disabled={!canclaim || mutation.isLoading} onClick={claimHandler}>
                  Claim Pack
                </Button>
              </Box>
            </Box>
            </Container>
        </React.Fragment>
    )
}