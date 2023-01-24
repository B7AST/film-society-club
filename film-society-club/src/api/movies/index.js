import axios from 'axios';
const TOKEN = '247de336'

export async function fetchMovies({search= "", type= "", year= "", page= 1 }) {
    
    const parameters = {s: search, type, y: year, page}

    try{
        const result = await axios.get("https://www.omdbapi.com", {
            header: {"Content-Type": "application/json"},
            params: {apikey: TOKEN, ...parameters},

        })
        return result.data
    }
    catch(error){
        console.log(error)
    }
}

export async function retrieveMovie(id) {
    
    const parameters = {i: id}

    try{
        const result = await axios.get("https://www.omdbapi.com", {
            header: {"Content-Type": "application/json"},
            params: {apikey: TOKEN, ...parameters},

        })
        return result.data
    }
    catch(error){
        console.log(error)
    }
}