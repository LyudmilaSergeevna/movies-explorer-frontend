import React from 'react';
import './App.css';
import Header from '../Header/Header';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import {ProtectedRoute, ProtectedLoginRegisterRoute } from '../ProtectedRoute/ProtectedRoute';
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
  const [filtered, setFiltered] = React.useState(localStorage.getItem('filter') ? localStorage.getItem('filter') : false);
  const [filteredSavedM, setFilteredSavedM] = React.useState(false);
  const JWT = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = React.useState(JWT);
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [array, setArray] = React.useState([]);


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
        alert(err)
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
        alert(err)
      })
  }

  function handleMenuClick() {
    setMenuPopupOpen(true);
  }

  function closeMenuPopup() {
    setMenuPopupOpen(false);
  }

  function likedMovies(arr) {
    let likedArr=[];
    let filteredArr=[];
    let toFilter=[]

    api.getMovies()
      .then((moviesArray) => {
        if (moviesArray.length !== 0) {
          moviesArray.forEach((movie) => {
          arr.map((item) => (item.id === movie.movieId ? (likedArr.push({...item, liked: true,  _id: movie._id}), toFilter.push(item)) : likedArr.push(item)));
          filteredArr = [...new Set(likedArr)]
        })
          toFilter.forEach((item) => {
            return filteredArr.splice(filteredArr.indexOf(item), 1)
          })
          filteredArr.sort((a, b) => a.id > b.id ? 1 : -1)
          setMovies(filteredArr)
          setArray(filteredArr)   
      } else {
        setMovies(arr)
        setArray(arr)
      }
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      })  

    } 

  function handleFilterCheck(filter) {
    const filteredMovies = [];
    const movies = JSON.parse(localStorage.getItem('foundMovies'));
    if (filter) {
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
          likedMovies(filteredMovies)
          }
    } else {
    localStorage.removeItem('filter');
    localStorage.removeItem('filteredMovies');
    setNoMatch(false);
    }
  }

  function handleFilterCheckSavedMovies(filter) {
    const filteredMovies = [];
    const savedMovies = JSON.parse(localStorage.getItem('foundSavedMovies'));
    if (filter) {
      if (savedMovies.length > 0) {
        savedMovies.forEach((element) => {
          if (element.duration < 41) {
          filteredMovies.push(element);
          return filteredMovies;
        }
        })
        console.log(filteredMovies)
      if (filteredMovies.length === 0) {
        setNoMatchSavedMovies(true);
      } else { 
        setFoundSavedMovies(filteredMovies);
      }
      } 
    } else {
      setNoMatchSavedMovies(false);
    }
  }

  function findMovies(request, array, filter) {
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
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        localStorage.setItem('request', request);
        if (filter) {
          handleFilterCheck(true)
        } else {
          handleFilterCheck(false)
          setNoMatch(false);
          likedMovies(foundMovies)
      }}
  }


  function findSavedMovies(request, array, filter) {
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
    if (foundMovies.length === 0) {
      setNoMatchSavedMovies(true);
      } else {
         localStorage.setItem('foundSavedMovies', JSON.stringify(foundMovies));
        if (filter) {
          handleFilterCheckSavedMovies(true)
        } else {
          handleFilterCheckSavedMovies(false)
          setNoMatchSavedMovies(false);
          setFoundSavedMovies(foundMovies);
        }
      }
  }

  function handleSearchSubmit(data, filter, saved) {
    const request = data; 
    if (saved) {
      if (filter === undefined || filter === null) {
        findSavedMovies(request, savedMovies, filteredSavedM);
      } else {
      findSavedMovies(request, savedMovies, filter); 
      }  
    } else {
      if (localStorage.getItem('movies')) {
        const movies = JSON.parse(localStorage.getItem('movies'));
        if (filter === undefined) {
          findMovies(request, movies, filtered);
        } else {
        findMovies(request, movies, filter); 
        }  
      } else {
      setPreloader(true)
      moveisApi.getMovies()
        .then((moviesArray) => {
          localStorage.setItem('movies', JSON.stringify(moviesArray));
          if (filter === undefined) {
            findMovies(request, moviesArray, filtered);
          } else {
          findMovies(request, moviesArray, filter); 
          }  
          setPreloader(false);
        })
      .catch((err) => {
        setBitFilmApiError(true);
        console.log(err)
        alert(err)
      })
      }
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
          alert(err)
        })
    } else {
      api.unlikeMovie(movie._id)
      .then(() => {
        const newArray = movies.map((item) => item.id === movie.id ? {...item, liked: false} : item )
        setMovies(newArray)
     })
     .catch((err) => {
       console.log(err);
       alert(err)
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
        alert(err)
      })
  }

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);

  }

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/movies", {replace: true})
    setMovies([])
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
          alert(err)
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
            likedMovies={likedMovies}
            array={array}
            setFiltered={setFiltered}  
            onSearchSubmit={handleSearchSubmit} 
            onLikeMovie={handleCardLike}/> } />
            <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} 
            loggedIn={loggedIn} 
            foundSavedMovies={foundSavedMovies}
            savedMovies={savedMovies}
            onDeleteMovie={deleteMovie}
            noMatchSavedMovies={noMatchSavedMovies}
            setFilteredSavedM={setFilteredSavedM}
            onSearchSubmit={handleSearchSubmit} 
            setNoMatchSavedMovies={setNoMatchSavedMovies} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile}
            loggedIn={loggedIn}
            logout={handleLogout}
            onUpdateUser={handleUpdateUser}/>} />   
            <Route path="/signin" element={<ProtectedLoginRegisterRoute element={Login} handleLogin={handleLogin} tokenCheck={tokenCheck} loggedIn={loggedIn}/>} />
            <Route path="/signup" element={<ProtectedLoginRegisterRoute element={Register} tokenCheck={tokenCheck} handleLogin={handleLogin} loggedIn={loggedIn} />} />
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
