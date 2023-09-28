

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTE0NDE4ZTU3NTJiOTYxNzAwMGZiYzkyMmNlNzVjYiIsInN1YiI6IjY1MTM5ZDM5Y2FkYjZiMDJiZjAwM2M2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TNsDdh_8LuhlINioFBTba-65Kh43ZpPKb82gdhsxSeY`
  }
};

const getRandomPage = () => {
  return Math.floor(Math.random() * 40250) + 1;
}

export const getMoviesByGenre = async (genre) => {
  const page = getRandomPage();

  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`, options)
  const json = await res.json()

  const movies = json.Search

  return movies
}