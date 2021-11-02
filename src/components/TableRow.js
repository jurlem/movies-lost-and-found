import React, { useContext, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { Button, Grid, Typography, Stack, Divider, Paper } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

import { useGetWatchlist } from '../utils/useMovies'
import { addWatchlist } from '../utils/useMovies';
import { useGetFavorites } from '../utils/useMovies'
import { addFavorite } from '../utils/useMovies';
import UserIdContext from '../context/userIdContext';
import SessionContext from '../context/sessionContext';


export default function TableRow({ movie: { id: movieId, poster_path, title, overview, release_date } }) {

  const { userId } = useContext(UserIdContext);
  const { sessionId } = useContext(SessionContext);
  const [disable, setDisable] = useState(false)
  const [disableFavorite, setDisableFavorite] = useState(false)

  const { data, error } = useGetWatchlist(userId, sessionId)
  const { data: favoritesData, error: favoritesError } = useGetFavorites(userId, sessionId)


  const addToWatchList = async () => {
    await addWatchlist(movieId, userId, sessionId)
    setDisable(true)
  }

  const addToFavorites = async () => {
    await addFavorite(movieId, userId, sessionId)
    setDisableFavorite(true)
  }

  const isInWatchlist = () => {
    const isIn = data?.results.filter(movie => movie.id === movieId)
    if (isIn?.length === 0) {
      return false
    } else {
      return true
    }
  }
  const watchlist = isInWatchlist()

  const isInFavorites = () => {
    const isIn = favoritesData?.results.filter(fav => fav.id === movieId)
    if (isIn?.length === 0) {
      return false
    } else {
      return true
    }
  }
  const favorites = isInFavorites()

  if (data === undefined) {
    return null
  }
  if (error || favoritesError) {
    return <p>{error}{favoritesError}</p>
  }

  return (
    <Paper>
      <Grid container justifyContent="center" key={movieId}>
        <Grid item xs={4}>

          <Link href={`/movie/${movieId}`}>
            <a>
              {poster_path &&
                <Image width="95" height="130" alt="Movie poster"
                  src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                />
              }
            </a>
          </Link>
        </Grid>

        <Grid xs={8} item container py={2}>
          <Grid item md={12}>
            <Typography variant="h7">
              {title}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="body">
              {release_date?.substring(0, 4)}
            </Typography>
          </Grid>
          <Grid container direction="row" item md={12} >

            <Button
              size='small'
              disabled={watchlist || disable}
              onClick={() => addToWatchList(movieId)}
              startIcon={
                watchlist ? <WatchLaterIcon /> :
                  disable ? <WatchLaterIcon /> :
                    <WatchLaterOutlinedIcon />}
            >{watchlist ? 'In Watchlist' : disable ? 'In Watchlist' : 'Add to Watchlist'}</Button>

            <Button
              size='small'
              disabled={favorites || disableFavorite}
              onClick={() => addToFavorites(movieId)}
              startIcon={
                disableFavorite ? <StarIcon /> :
                  favorites ? <StarIcon /> :
                    <StarBorderOutlinedIcon />}
            >{disableFavorite ? 'My Favourite' : favorites ? ' My Favourite' : 'Mark as favorite'}</Button>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </Paper >
  );
};


