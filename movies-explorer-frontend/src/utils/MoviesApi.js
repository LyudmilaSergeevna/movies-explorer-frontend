class MoviesApi {
  constructor({ url, /*headers*/}) {
    this._url = url;
    /*this._headers = headers; */
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

  getMovies() {
    return this._request(this._url, {
      headers : {
        'Content-Type': "application/json",
        /*authorization: localStorage.getItem('token'),*/
      }
    })
  }

} 

const optionsApi = {
  url: 'https://api.nomoreparties.co/beatfilm-movies'
} 

const moveisApi = new MoviesApi(optionsApi)

export default moveisApi;