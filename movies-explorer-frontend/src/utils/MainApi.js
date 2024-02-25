class MainApi {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers; 
  }

  _request(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      throw new Error(`Ошибка: ${res.status}`)
      })
  }
    
 getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

 getMovies() {
    return this._request(`${this._url}/movies`, {
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  patchUserInfo({name, email}) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  likeMovie({country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN}) {
    return this._request(`${this._url}/movies`, {
      method: "POST",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        country: country, 
        director: director, 
        duration: duration, 
        year: year, 
        description: description, 
        image: `https://api.nomoreparties.co${image.url}`, 
        trailerLink: trailerLink, 
        thumbnail: `https://api.nomoreparties.co${image.url}`, 
        movieId: id, 
        nameRU: nameRU, 
        nameEN: nameEN
      })
    })
  }

  unlikeMovie(id) {
    return this._request(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  }

const optionsApi = {
  url: process.env.REACT_APP_API_URL,
  //url: 'http://localhost:3000'
} 

const api = new MainApi(optionsApi)

export default api;