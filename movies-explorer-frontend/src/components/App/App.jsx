import React from 'react';
import './App.css';
import Header from '../Header/Header';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import MenuPopup from '../MenuPopup/MenuPopup';
import api from '../../utils/MainApi';
import moveisApi from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function App() {

  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  const routeMain = useMatch("/");
  const routeMovies = useMatch("/movies");
  const routeSavedMovies = useMatch("/saved-movies");
  const routeProfile = useMatch("/profile");
  const [movies, setMovies] = React.useState([]);
  const [preloader, setPreloader] = React.useState(false);
  const [noMatch, setNoMatch] = React.useState(false);
  const [noMatchSavedMovies, setNoMatchSavedMovies] = React.useState(false)
  const [bitfilmApiError, setBitFilmApiError] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const [filtered, setFiltered] = React.useState(false);
  const [filteredSavedM, setFilteredSavedM] = React.useState(false);
  const JWT = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = React.useState(JWT);
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  //const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);


  React.useEffect(() => {
    tokenCheck()
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getMovies()])
      .then(([userData, moviesArray]) => {
        setSavedMovies(moviesArray);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })  
    }}, [loggedIn]);


  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        alert('Данные пользователя успешно изменены')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleMenuClick() {
    setMenuPopupOpen(true);
  }

  function closeMenuPopup() {
    setMenuPopupOpen(false);
  }

  function handleFilterCheck(filter) {
    const filteredMovies = [];
    const movies = JSON.parse(localStorage.getItem('foundMovies'));
    if (filter) {
        if (movies !== null) {
          movies.forEach((element) => {
            if (element.duration < 41) {
              filteredMovies.push(element);
              return filteredMovies;
            }
          })
          if (filteredMovies.length === 0) {
            setNoMatch(true);
          } else { 
          localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
          localStorage.setItem('filter', filter);
          setMovies(filteredMovies);
          }
        }
    } else {
    localStorage.removeItem('filter');
    localStorage.removeItem('filteredMovies');
    setNoMatch(false);
    console.log(movies)
    if (movies === null) {
      setMovies([])
    } else {
    setMovies(movies); 
    }
    }
  }

  function handleFilterCheckSavedMovies(filter) {
    const filteredMovies = [];
    if (filter) {
      if (savedMovies.length > 0) {
        savedMovies.forEach((element) => {
          if (element.duration < 41) {
          filteredMovies.push(element);
          return filteredMovies;
        }
        })
      if (filteredMovies.length === 0) {
        setNoMatchSavedMovies(true);
      } else { 
        setFoundSavedMovies(filteredMovies);
      }
      }
    } else {
      setNoMatchSavedMovies(false);
      setFoundSavedMovies(savedMovies);
    }
  }

  function findMovies(request, array) {
    const foundMovies = [];
    array.forEach((element) => { 
      const movieRequest = request.toLowerCase();
      const movieNameRu = element.nameRU.toLowerCase();
      const movieNameEn = element.nameEN.toLowerCase();
      if (movieNameRu.includes(movieRequest) || movieNameEn.includes(movieRequest)) {
        foundMovies.push(element);
        return foundMovies;
      }
    })
    if (foundMovies.length === 0) {
      setNoMatch(true);
      } else {
    setNoMatch(false);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('request', request);
    setMovies(foundMovies);
      }
  }


  function findSavedMovies(request, array) {
    const foundMovies = [];
    array.forEach((element) => { 
      const movieRequest = request.toLowerCase();
      const movieNameRu = element.nameRU.toLowerCase();
      const movieNameEn = element.nameEN.toLowerCase();
      if (movieNameRu.includes(movieRequest) || movieNameEn.includes(movieRequest)) {
        foundMovies.push(element);
        return foundMovies;
      }
    });
    if (filtered) {
      handleFilterCheckSavedMovies()
    } else {
    if (foundMovies.length === 0) {
      setNoMatchSavedMovies(true);
    } else {
        setFoundSavedMovies(foundMovies)
        setNoMatch(false);
      }
    }
  }

  function handleSearchSubmit(data, saved) {
    const request = data;  
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
    if (saved) {
      findSavedMovies(request, savedMovies)
    } else {
      findMovies(request, movies);   
    }} else {
      setPreloader(true)
      moveisApi.getMovies()
        .then((moviesArray) => {
          localStorage.setItem('movies', JSON.stringify(moviesArray));
          const movies = JSON.parse(localStorage.getItem('movies'));
          findMovies(request, movies);
          setPreloader(false);
        })
      .catch((err) => {
        setBitFilmApiError(true);
        console.log(err)
      })
    }
  }


 function handleCardLike(movie) {
    if (!movie.liked) {
      api.likeMovie(movie)
        .then((newMovie) => {
         const newArray = movies.map((item) => item.id === movie.id ? {...item, liked: true, _id: newMovie._id} : item )
         setMovies(newArray)
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.unlikeMovie(movie._id)
      .then(() => {
        const newArray = movies.map((item) => item.id === movie.id ? {...item, liked: false} : item )
        setMovies(newArray)
     })
     .catch((err) => {
       console.log(err);
      })
  }
  }

  function deleteMovie(movie) {
    api.unlikeMovie(movie._id)
      .then(() => {
        const newArray = movies.map((item) => item.id === movie.movieId ? {...item, liked: false} : item )
        setMovies(newArray)
        const array = savedMovies.filter((c) => c._id !== movie._id);
        setSavedMovies(array);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);

  }

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/movies", {replace: true})
  } 
 
  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token'); 
      if (jwt){
        Auth.tokenCheck(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {navigate("/signin", {replace: true})}
    }
  } 


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="App">
          {(routeMain || routeMovies || routeSavedMovies || routeProfile) ? <Header loggedIn={loggedIn} onClick={handleMenuClick}/> : <></>}
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/movies" element={<ProtectedRoute tokenCheck={tokenCheck} element={Movies} 
            loggedIn={loggedIn}
            movies={movies} 
            noMatch={noMatch} 
            preloader={preloader} 
            apiError={bitfilmApiError}
            setMovies={setMovies}
            setFiltered={setFiltered}  
            onSearchSubmit={handleSearchSubmit} 
            onFilterClick={handleFilterCheck}
            onLikeMovie={handleCardLike}/> } />
            <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} 
            loggedIn={loggedIn} 
            foundSavedMovies={foundSavedMovies}
            savedMovies={savedMovies}
            onDeleteMovie={deleteMovie}
            noMatchSavedMovies={noMatchSavedMovies}
            setFilteredSavedM={setFilteredSavedM}
            onSearchSubmit={handleSearchSubmit} 
            onFilterClick={handleFilterCheckSavedMovies}
            setNoMatchSavedMovies={setNoMatchSavedMovies} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile}
            loggedIn={loggedIn}
            logout={handleLogout}
            onUpdateUser={handleUpdateUser}/>} />   
            <Route path="/signin" element={<Login handleLogin={handleLogin} tokenCheck={tokenCheck}/>} />
            <Route path="/signup" element={<Register tokenCheck={tokenCheck} handleLogin={handleLogin}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {(routeMain || routeMovies ||routeSavedMovies) ? <Footer /> : <></>}
          <MenuPopup isOpen={isMenuPopupOpen} onClose={closeMenuPopup}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
