import React from 'react';
import './App.css';
import Header from '../Header/Header';
import { Routes, Route, useMatch } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import MenuPopup from '../MenuPopup/MenuPopup';

function App() {

  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  const routeMain = useMatch("/");
  const routeMovies = useMatch("/movies");
  const routeSavedMovies = useMatch("/saved-movies");
  const routeProfile = useMatch("/profile");


  function handleMenuClick() {
    setMenuPopupOpen(true);
  }

  function closeMenuPopup() {
    setMenuPopupOpen(false);
  }

  return (
    <div className="root">
      <div className="App">
        {(routeMain || routeMovies || routeSavedMovies || routeProfile) ? <Header onClick={handleMenuClick} /> : <></>}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />   
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {(routeMain || routeMovies ||routeSavedMovies) ? <Footer /> : <></>}
        <MenuPopup isOpen={isMenuPopupOpen} onClose={closeMenuPopup}/>
      </div>
    </div>
  );
}

export default App;
