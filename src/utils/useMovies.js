import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())


export const useMovieDetails = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&language=en-US`
  const { data, error } = useSWR(url, fetcher)
  return {
    data,
    error
  }
}

export const useGetWatchlist = (userId, sessionId) => {
  const url = `https://api.themoviedb.org/3/account/${userId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc`
  const { data, error } = useSWR(url, fetcher)
  return {
    data,
    error
  }
}

export const useGetFavorites = (userId, sessionId) => {
  const url = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc`
  const { data, error } = useSWR(url, fetcher)
  return {
    data,
    error
  }
}

export function getSearchResults(value) {
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&language=en-US&query=${value}&page=1&include_adult=false`)
    .then((res) => res.json())
    .then(data => {
      if (!data.error) {
        return data
      } else {
        return error
      }
    })

}

export function addWatchlist(id, userId, sessionId) {

  fetch(`https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&session_id=${sessionId}`,
    {
      method: 'POST',
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        watchlist: true
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.status_code === '1') {
        return true

      }
    })
}
export function addFavorite(id, userId, sessionId) {

  fetch(`https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&session_id=${sessionId}`,
    {
      method: 'POST',
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        favorite: true
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.status_code === '1') {
        return true
      }
    })
}

