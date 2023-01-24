import React from "react";
import "./index.css"

const MovieDetails = (props) => {

    const {movie} = props
    console.log(movie)

    return (
        <div className="description-section" id="testing">
            <div><img src={movie.Poster}></img></div>
            <div className="movie-description">
                <div className="des-movie-title">{movie.Title}</div>
                <div className="des-movie-plot">{movie.Plot}</div>
                <div className="des-movie-genre">Genre: {movie.Genre}</div>
            </div>
        </div>
    )
}

export default MovieDetails