import {Movie} from "../types/movies.ts";
import {DateTime} from "luxon";


const MovieCard = ({movies}: {movies: Movie[]}) => {
    return (
        <>
            {movies.map((movie) => {
                const releaseDate = movie.release_date ?? movie.first_air_date

                return (
                    <div key={movie.id} className="card card-compact bg-base-300 shadow-xl cursor-pointer">
                        <figure>
                            <img
                                src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
                                alt="Shoes"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{movie.title ?? movie.name}</h2>
                            <p>Release Date: {releaseDate ? DateTime.fromISO(releaseDate).toFormat('DDD') : ''}</p>
                            <p>Vote average: {movie.vote_average}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )

}

export default MovieCard