import { Movie } from "../types/movies.ts";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {MediaTypeEnum} from "../enums/MovieTabEnum.ts";

const MovieCard = ({ movies, mediaType }: { movies: Movie[], mediaType: MediaTypeEnum }) => {
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
        const releaseDate = movie.release_date ?? movie.first_air_date
        const rating = movie.vote_average * 10;

        return (
          <div
            onClick={() => handleClick(movie.id.toString(), movie.media_type ?? mediaType)}
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
              <div data-testid='circular-progress-element' className='w-12 h-12'>
                <CircularProgressbar styles={buildStyles({
                    textSize: '25px',
                    pathColor: rating >= 70 ? '#10B981' : rating >= 40 ? '#F59E0B' : '#EF4444',
                    textColor: rating >= 70 ? '#10B981' : rating >= 40 ? '#F59E0B' : '#EF4444',
                    trailColor:  '#374151',

                })} maxValue={100} value={rating} text={`${(movie.vote_average * 10).toFixed(0)}%`} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieCard;
