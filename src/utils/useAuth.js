


export function createToken() {
  fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}`)
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        return window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${process.env.NEXT_PUBLIC_BASE_URL}/approved`
      } else {
        console.log('errors')
      }
    })
}


