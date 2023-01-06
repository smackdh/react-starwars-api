import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState();

  function fetchMoviesHandler() {
    fetch("https://swapi.py4e.com/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setmovies(data);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
