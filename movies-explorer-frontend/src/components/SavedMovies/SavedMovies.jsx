import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi'

function SavedMovies(props) {

  const [moviesArray, setMoviesArray] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);

  React.useEffect(() => {
    setMoviesArray(props.savedMovies)
    api.getMovies()
    .then((moviesArray) => {
      setMoviesArray(moviesArray)
      setFoundMovies('') 
    })
    .catch((err) => {
      console.log(err);
    }) 
  }, [props.savedMovies])


  React.useEffect(() => {
    if (props.foundSavedMovies.length > 0) {
      setFoundMovies(props.foundSavedMovies)
    }
   }, [props.foundSavedMovies])

  return (
    <main className="saved-movies">
      <SearchForm onSearchSubmit={props.onSearchSubmit} onFilterClick={props.onFilterClick} setFilteredSavedM={props.setFilteredSavedM}/>
      <MoviesCardList savedMovies={foundMovies.length > 0 ? foundMovies : moviesArray} deleteMovie={props.onDeleteMovie} noMatchSavedMovies={props.noMatchSavedMovies} setNoMatchSavedMovies={props.setNoMatchSavedMovies} />
      <div className="saved-movies__devider"></div>
    </main>
  );
}

export default SavedMovies;