import { useEffect, useState } from 'react';
import { fetchMovies, retrieveMovie } from './api/movies';
import _ from  'lodash'
import './App.css';
import MovieDetails from './pages/movies/detail';

function App() {
  const [title, setTile] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [page, setPage] = useState("")
  const [movies, setMovies] = useState([])
  const [favoriteList, setFavoriteList] = useState([])
  const [viewedList, setViewedList] = useState([])

  const [selectedMovie, setSelectedMovie] = useState({})
  const [totalMovies, setTotalMovies] = useState()

  const fetcher = async () => {
    if (!title) {
      alert("Please enter title")
      return null
    }

    const result = await fetchMovies({search: title, type, page, year})
    setMovies(result.Search)
    setTotalMovies(result.totalResults)
  }

  const getMovie = async (id) => {
    const result = await retrieveMovie(id)
    setSelectedMovie(result)
  }

  const getPageOptions = (pageNumbers) => {
    let options = []
    for (let i = 1; i <= pageNumbers; i++) {
      options.push(<option value={i}>{i}</option>)
    }

    return options
  }

  const reset = () => {
    setTile('')
    setYear('')
    setType('')
    setPage('')
  }

  useEffect(() => {if(title){fetcher()}}, [page])

  useEffect(() => {

    if(localStorage.getItem("viewedList") == null){
    localStorage.setItem("viewedList", JSON.stringify(viewedList))
    }
    if(localStorage.getItem("favoriteList") == null){
      localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
    }
  
  }, [viewedList, favoriteList])
  
  const setView = (id) => {
    getMovie(id)
    
    let lsViewedList = [...JSON.parse(localStorage.getItem("viewedList"))]
    
    if (lsViewedList) {
      lsViewedList.push(id)
      lsViewedList = [...new Set(lsViewedList)]
    } else {
      lsViewedList = [id]
    }

    localStorage.setItem('viewedList', JSON.stringify(lsViewedList))
    setViewedList(lsViewedList)
  }

  const makeFavorite = (id) => {
    let lsFavoriteList = [...JSON.parse(localStorage.getItem("favoriteList"))]
    
    if (lsFavoriteList) {
      lsFavoriteList.push(id)
      lsFavoriteList = [...new Set(lsFavoriteList)]
    } else {
      lsFavoriteList = [id]
    }

    localStorage.setItem('favoriteList', JSON.stringify(lsFavoriteList))
    setFavoriteList(lsFavoriteList)
  }

  const removeFromFavorite = (id) => {
    let lsFavoriteList = [...JSON.parse(localStorage.getItem("favoriteList"))]
    
    lsFavoriteList = lsFavoriteList.filter((item) => item !== id )

    localStorage.setItem('favoriteList', JSON.stringify(lsFavoriteList))
    setFavoriteList(lsFavoriteList)
  }

  return (
    <div className="App">
      {/* Search */}
      <div className='search-section'>
        <div>
          <label for="title">Title: </label>
          <input onChange={e => setTile(e.target.value)} value={title} type="text" id="title"></input>
        </div>
        <div>
          <label for="year">Year: </label>
          <input onChange={e => setYear(e.target.value)} value={year} type="number" min="1850" max="2023" id="year"></input>
        </div>
        <div>
          <label for="type">Type: </label>
          <select onChange={e => setType(e.target.value)} value={type} id='type' name='type'>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>
        <div>
          <button onClick={fetcher} className="btn-search">Search</button>
          <button onClick={reset} className="btn-search">Reset</button>
        </div>

        {Math.ceil(totalMovies / 10) > 1 && <div>
          <select onChange={e => setPage(e.target.value)} value={page}>
            {
              getPageOptions(Math.ceil(totalMovies / 10))
            }
          </select>
        </div>}
      </div>
      {/* Table */}
      <div className='search-result'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              <th>Viewed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, idx) => (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td><img src={movie.Poster}></img></td>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.Type}</td>
                <td>{viewedList.includes(movie.imdbID) ? 'YES' : 'NO'}</td>
                <td>
                  <div className='movie-actions'>
                    <button onClick={() => setView(movie.imdbID)}><a href='#testing'>View</a></button>
                    <button onClick={() => favoriteList.includes(movie.imdbID) ? removeFromFavorite(movie.imdbID) : makeFavorite(movie.imdbID)}>{favoriteList.includes(movie.imdbID) ? "-Fav" : "+Fav"}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!_.isEmpty(selectedMovie) && <MovieDetails movie={selectedMovie} />}
    </div>
  );
}

export default App;
