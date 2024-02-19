import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi'

function SavedMovies(props) {

  const [moviesArray, setMoviesArray] = React.useState([]);

  React.useEffect(() => {
    api.getMovies()
    .then((moviesArray) => {
      setMoviesArray(moviesArray)
    })
    .catch((err) => {
      console.log(err);
    }) 
  }, [props.savedMovies])

  return (
    <main className="saved-movies">
      <SearchForm onSearchSubmit={props.onSearchSubmit} onFilterClick={props.onFilterClick}/>
      <MoviesCardList savedMovies={moviesArray} deleteMovie={props.onDeleteMovie} />
      <div className="saved-movies__devider"></div>
    </main>
  );
}

export default SavedMovies;