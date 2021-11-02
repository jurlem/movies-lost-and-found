import React from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';


export default function Hero() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
      }}
    >
      <Grid container style={{ position: 'relative' }} justifyContent="center"
        alignItems="center">
        <Image src='https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg'
          height='500'
          width='1500'
          alt='background'
        />
        <Grid style={{ color: 'white', position: 'absolute', top: '5%', left: '5%' }}>
          <Typography variant='h4' >
            Millions of movies to discover.
          </Typography>
          <Typography variant='h4' component='div'>
            Explore now.
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="footer"
        sx={{
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Image
          alt='moviedb logo'
          src='/blue_long_logo.svg'
          height='150'
          width='250'
        />
      </Box>
    </Box>
  )
}


