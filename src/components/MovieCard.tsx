import { Movie } from "../types/movies.ts";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movies }: { movies: Movie[] }) => {
  const navigate = useNavigate();
  const handleClick = (id: string, mediaType: string) => {
    if (mediaType === "movie") {
      navigate(`/movies/${id}`);
    } else if (mediaType === "tv") {
      navigate(`/tv-shows/${id}`);
    }
  };

  return (
    <>
      {movies.map((movie) => {
        const releaseDate = movie.release_date ?? movie.first_air_date;

        return (
          <div
            onClick={() => handleClick(movie.id.toString(), movie.media_type)}
            key={movie.id}
            className="card card-compact bg-base-300 shadow-xl cursor-pointer hover:animate-pulse h-[600px]"
          >
            <figure>
              <img
                src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{movie.title ?? movie.name}</h2>
              <p>
                Release Date:{" "}
                {releaseDate
                  ? DateTime.fromISO(releaseDate).toFormat("DDD")
                  : ""}
              </p>
              <p>Vote average: {movie.vote_average}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieCard;
