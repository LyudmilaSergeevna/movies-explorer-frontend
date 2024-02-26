import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  const request = localStorage.getItem('request');
  const filter = localStorage.getItem('filter');
  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
  const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
  const [defaultMovies, setDefaultMovies] = React.useState(0);
  const [stepMovies, setStepMovies] = React.useState(0);
  const [i, setI] = React.useState(defaultMovies);
  const [buttonHid, setButton] = React.useState(props.noMatch);

  React.useEffect(() => {
    if (foundMovies && request){
      if (filteredMovies && filter) {
        props.likedMovies(filteredMovies)         
      } else {
        props.likedMovies(foundMovies)  
    }}
  }, []); 

  React.useEffect(() => {
    setDefaultMovies(0)
    if (props.movies.length !== 0) {
    if (props.movies.length>=defaultMovies) {
      setButton(false)
    } else {
      setButton(true)
    }} else { setButton(true) }
  }, [props.movies]);


  React.useEffect(() => {
    const handleResize = () => {
      setDefaultMovies(0)
      if (window.innerWidth >= 1280) {
        setDefaultMovies(12);
        setStepMovies(3);
        setI(12)
      } else if (window.innerWidth < 1280 && window.innerWidth > 891) {
        setDefaultMovies(8);
        setStepMovies(2);
        setI(8)
      } else if (window.innerWidth < 892) {
        setDefaultMovies(5);
        setStepMovies(2);
        setI(5)      
      }  
    }
              
    handleResize() 
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultMovies, stepMovies])


  function handleMoreClick() {
    setI(i+stepMovies)
    if (i+stepMovies >= props.movies.length) {
      setButton(true)
    }      
  }  


  return (
    <main className="movies">
      <SearchForm onSearchSubmit={props.onSearchSubmit} inputText={request} setFiltered={props.setFiltered} onFilterClick={props.onFilterClick} />
      <MoviesCardList array={props.array} i={i} movies={props.movies} preloader={props.preloader} noMatch={props.noMatch} apiError={props.apiError} likeMovie={props.onLikeMovie} isLiked={props.isLiked} defaultMovies={defaultMovies}/>
      <button className={buttonHid ? "movies__more-button movies__more-button_hidden" : "movies__more-button"} type="button" onClick={handleMoreClick}>Ещё</button>
    </main>
  );
}

export default Movies;