// import { createSessionId } from '../utils/useAuth'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import UserContext from '../context/userContext';
import SessionContext from '../context/sessionContext';
import { createNewSession } from '../utils/useMovies'
import Hero from '../components/Hero'


export default function Approved() {
  const { query: { request_token } } = useRouter()
  const { user, setUser } = useContext(UserContext);
  const { sessionId, setSessionId } = useContext(SessionContext);

  const [error, setError] = useState(null)

  async function createSessionId(request_token) {

    if (sessionId) {
      return sessionId
    }

    if (request_token) {
      return fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}`,
        {
          method: 'POST',
          body: JSON.stringify({ request_token: request_token }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSessionId(data.session_id)
            return data.session_id
          }
        })
    }
  }


  const getMyProfile = async (sessionId) => {

    await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          return data
        }
      })
  }

  async function getTokenAndSession() {
    const session = await createSessionId(request_token)
    const profile = await getMyProfile(session)
  }

  useEffect(() => {
    if (request_token) {
      return getTokenAndSession()
    }

  }, [request_token])

  if (request_token === undefined) {
    return null
  }

  return (
    <Hero />
  )
}
