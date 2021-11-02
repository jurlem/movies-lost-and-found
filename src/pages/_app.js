import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Nav from '../components/Nav'

import UserContext from '../context/userContext';
import UserIdContext from '../context/userIdContext';
import SessionContext from '../context/sessionContext';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  const [sessionId, setSessionId] = useState()


  return (
    <>
      <SessionContext.Provider value={{ sessionId, setSessionId: s => { setSessionId(s) } }}>
        <UserIdContext.Provider value={{ userId, setUserId: s => { setUserId(s) } }}>
          <UserContext.Provider value={{ user, setUser: s => { setUser(s) } }}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Nav />
            <Component {...pageProps} />
          </UserContext.Provider>
        </UserIdContext.Provider>
      </SessionContext.Provider>
    </>
  )
}

export default MyApp;
