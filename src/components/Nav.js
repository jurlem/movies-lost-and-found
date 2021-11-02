import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import { createToken } from '../utils/useAuth'
import UserContext from '../context/userContext';


const Nav = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    await createToken()
  }

  const handleLogout = async () => {
    setUser(null)
    router.push('/')
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <NextLink href="/" passHref>

          <Link variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Movies Lost and Found
          </Link>
        </NextLink >
        {user && (
          <Stack direction="row" spacing={2} alignItems="center">
            <NextLink href="/search" passHref>
              <Link
                variant="button"
                color={router.pathname == "/search" ? "primary.main" : "text.secondary"}
                href="/search"
                sx={{ my: 2 }}
              >
                Search
              </Link>
            </NextLink>
            <NextLink href="/favorites" passHref>
              <Link
                variant="button"
                color={router.pathname == "/favorites" ? "primary.main" : "text.secondary"}
                href="/favorites"
                sx={{ my: 1, mx: 1.5 }}
              >
                My Favourites
              </Link>
            </NextLink>
            <NextLink href="/watchlist" passHref>
              <Link
                variant="button"
                color={router.pathname == "/watchlist" ? "primary.main" : "text.secondary"}
                sx={{ my: 1, mx: 1.5 }}
              >
                My WatchList
              </Link>
            </NextLink>
          </Stack>
        )}
        {!user ? (
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <>
            <Button variant="outlined" sx={{ my: 1, mx: 1 }}>
              Hi, {user}
            </Button>
            <Button variant="text" sx={{ my: 1, mx: 1 }} onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default Nav;