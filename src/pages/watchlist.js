import React, { useContext } from 'react'
import { useRouter } from 'next/router';

import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

import UserIdContext from '../context/userIdContext';
import SessionContext from '../context/sessionContext';
import { useGetWatchlist } from '../utils/useMovies'


const MyWatchList = () => {
  const router = useRouter()
  const { userId } = useContext(UserIdContext);
  const { sessionId } = useContext(SessionContext);

  const { data, error } = useGetWatchlist(userId, sessionId)

  const toDetailsPage = (id) => {
    router.push(`/movie/${id}`)
  }

  if (data === undefined) {
    return null
  }

  if (error) {
    return <span>{error}</span>
  }

  return (
    <div>
      <Container disableGutters maxwidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          MY WATCHLIST <span>({data?.total_results})</span>
          {data?.total_results < 1 && <p>no items in the watchlist</p>}
        </Typography>
      </Container>
      <Container sx={{ py: 8 }} maxwidth="lg">
        <Grid container direction="row" spacing={4}>
          {data?.results.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <Card
                maxwidth={120}
              >
                <CardActionArea onClick={() => toDetailsPage(`${movie.id}`)}>
                  <CardMedia
                    component="img"
                    height="130"
                    image={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {movie.title}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      {movie.release_date.substring(0, 4)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.overview.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                   <Button size="small" color="primary" variant='outlined'>
                    Toggle
                  </Button> 
              </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div >
  )
}

export default MyWatchList;
