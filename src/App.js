import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");

      if (!response.ok) {
        throw new Error("Something went terribly wrong, old friend. 🧙🏼‍♂️");
      }

      const data = await response.json();

      const cleanedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(cleanedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let contents = <p>No movies yet!</p>;

  if (movies.length > 0) {
    contents = <MoviesList movies={movies} />;
  }

  if (isLoading) {
    contents = <p>Loading data....</p>;
  }

  if (error) {
    contents = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{contents}</section>
    </React.Fragment>
  );
}

export default App;
