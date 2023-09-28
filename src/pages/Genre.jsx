/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Genre = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [providers, setProviders] = useState([]);
  const [index, setIndex] = useState(0);
  const [reset, setReset] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let newPage = page;
    if (index === movies.length - 1) {
      setPage((page) => page + 1);
      newPage = newPage === 500 ? 0 : newPage + 1;
    } else if (index !== 0) {
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTE0NDE4ZTU3NTJiOTYxNzAwMGZiYzkyMmNlNzVjYiIsInN1YiI6IjY1MTM5ZDM5Y2FkYjZiMDJiZjAwM2M2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TNsDdh_8LuhlINioFBTba-65Kh43ZpPKb82gdhsxSeY",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-US&page=${newPage}&watch_region=AR&sort_by=popularity.desc&with_genres=${id}&with_watch_monetization_types=flatrate`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(...movies, response.results))
      .catch((err) => console.error(err));
  }, [id, reset]);

  useEffect(() => {
    if (movies.length > 0) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTE0NDE4ZTU3NTJiOTYxNzAwMGZiYzkyMmNlNzVjYiIsInN1YiI6IjY1MTM5ZDM5Y2FkYjZiMDJiZjAwM2M2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TNsDdh_8LuhlINioFBTba-65Kh43ZpPKb82gdhsxSeY",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${movies[index]?.id}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(
            
          );
          setVideoId(
            response.results.filter(
              (video) =>
                video.site === "YouTube" &&
                video.official &
                  (video.type === "Trailer" || video.type === "Teaser")
            ).length > 0 ? response.results.filter(
              (video) =>
                video.site === "YouTube" &&
                video.official &
                  (video.type === "Trailer" || video.type === "Teaser")
            )[0].key : ""
          );
        })
        .catch((err) => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/movie/${movies[index].id}/watch/providers`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setProviders(response.results?.AR?.flatrate);
        })
        .catch((err) => console.error(err));
    } else return;
  }, [index, movies]);

  const nextMovie = () => {
    if (index === movies.length - 1) {
      setReset(!reset);
      setIndex((index) => index + 1);
    } else {
      setIndex((index) => index + 1);
    }
  };

  const prevMovie = () => {
    if (index === 0) {
      return;
    } else {
      setIndex(index => index - 1);
    }
  };
  return (
    <div>
      <div className="navigation">
        <button disabled={index === 0} onClick={() => prevMovie()}>
          Prev
        </button>
        <button onClick={() => nextMovie()}>Next</button>
      </div>
      <div className="video">
        {
          videoId ? (
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${videoId}?si=3e4u-lJ0_R-bo2O1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : <p>No hay trailer</p>
        }
      </div>
      <div className="info">
        <h2 onClick={() => console.log(movies)}>{movies[index]?.title}</h2>
        <p>
          {movies[index]?.overview !== ""
            ? movies[index]?.overview
            : "Esta película no tiene descripción"}
        </p>
        <h3 onClick={() => console.log(providers, videoId, index)}>
          Providers
        </h3>
        {providers ? (
          <ul>
            {providers?.map((provider) => (
              <li key={provider?.id}>{provider?.provider_name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay proveedores para esta película</p>
        )}
      </div>
    </div>
  );
};

export default Genre;
