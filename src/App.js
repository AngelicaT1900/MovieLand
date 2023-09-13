import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

//API Key: 58374ac0

const API_URL = 'http://www.omdbapi.com?apikey=58374ac0';

const movie1 = {
    "Title": "Yellowstone",
    "Year": "2018–2023",
    "imdbID": "tt4236770",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGFiZjU5NGEtNTAwNS00ZjI2LTg0YTktNjg0ODFlM2E0NGVhXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState();
    const [searchTerm, setSearchTerm] = useState();

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search); //Change from console.log() to setMovies()
    }

    useEffect(() => {
        searchMovies('Yellowstone');
    }, []);

    return (
        <div className='app'>
            <h1>Movie Land</h1>
            <div className='search'>
                <input
                    placeholder="Search for Movies"
                    // value="Yellowstone" //change to searchTerm
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ?  (
                    <div className='container'>
                        {/* <MovieCard movie1={movies[0]}/> //replacing with dynamic code */}
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                        </div>
                    ) : (
                       <div className='empty'> {/*will see this if movie array is empty */}
                            <h2>No Movies Found</h2>
                       </div> 
                    )}

            
                {/* <div className='movie'> //Instead of these multiple divs, we can use an alternative
                    <div>
                        <p>{movie1.Year}</p>
                    </div>

                    <div>
                        <img src={movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder.com/400'} alt={movie1.Title}/>
                    </div>

                    <div>
                        <span>{movie1.Type}</span>
                        <h3>{movie1.Title}</h3>
                    </div>
                </div> */}
        </div>
    );
}

export default App;