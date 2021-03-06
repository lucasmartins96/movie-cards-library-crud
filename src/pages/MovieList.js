import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  fetchMovies = async () => {
    this.setState(
      { loading: true },
      async () => {
        const movies = await movieAPI.getMovies();
        this.setState({
          movies: [...movies],
          loading: false,
        });
      },
    );
  }

  componentDidMount = () => {
    this.fetchMovies();
  }

  render() {
    const { movies, loading } = this.state;
    // Render Loading here if the request is still happening
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="movie-list">
        <div>
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        </div>
        <div className="movie-list">
          { movies.map((movie) => <MovieCard key={ movie.id } movie={ movie } />) }
        </div>
      </div>
    );
  }
}

export default MovieList;
