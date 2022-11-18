import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AlbumCard from '../components/AlbumCard';
import { useQuery } from 'react-query';
import { getAllCards } from '../api';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Animalia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/f/fb/On%C3%A7a_do_Pantanal.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
      }
    }
  }
});

export default function Landing() {
  const {data, status} = useQuery("allCards", async ()=> {return await getAllCards(10)})

  let cards = []
  if (status === "success") {
    cards = data.data.cards || []
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.8)',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Animalia
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A card game with a purpose. Collect, have fun and learn about all the animals in Mexico.
              Trading cards that go from the most common to the rarest animals you can find in the country.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Button variant="contained">
                    <Link component={RouterLink} sx={{textDecoration: "none", color: "inherit"}} to="/app/home">Enter app</Link>
                </Button>
            </Stack>
            <Typography sx={{textAlign: "center", paddingTop: "2rem"}}>The cards include these animals and more:</Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <AlbumCard key={i} card={card}></AlbumCard>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Animalia
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Under construction.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}