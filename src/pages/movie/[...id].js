import React from 'react'
import { useRouter } from 'next/router'

// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image'
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

import { useMovieDetails } from '../../utils/useMovies'


const MoviePage = () => {
  const router = useRouter()
  const { id } = router.query
  const movieId = id?.toString()

  const { data, error } = useMovieDetails(movieId)

  if (data === undefined) { return null }
  if (error) { return <p>{error}</p> }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid item key={data.id} xs={12} >
        <Card
          maxWidth={345}
          key={data.id}>
          <CardMedia
            component="img"
            height="310"
            image={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {data.title}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {data.release_date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vote:  {data.vote_average}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.overview}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small" color="primary" variant='outlined'>
              Add/Remove from list
            </Button>
          </CardActions> */}
        </Card>
      </Grid>
    </Container>
  )
}
export default MoviePage