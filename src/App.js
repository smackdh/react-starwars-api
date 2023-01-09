import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-c8445-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went terribly wrong, old friend. 🧙🏼‍♂️");
      }

      const data = await response.json();
      console.log(data);

      // make an array to hold the movies, as the data is now different.
      // get each post from the object, and objects inside the object.
      // push that data into my array, as an object(json)
      // load the correct data

      const loadedMovies = [];

      for (const key in data) {
      }

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
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  // fetches the first time it loads. as dependencies are added but nothing inside them, it is not called again.
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-c8445-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{contents}</section>
    </React.Fragment>
  );
}

export default App;
