import AppLayout from "../../layout/AppLayout.tsx";
import { useParams } from "react-router-dom";
import { useMovieDetailsQuery } from "../../api/movies/query/useMovieQuery.ts";
import Loading from "../../components/Loading.tsx";
import ReactCountryFlag from "react-country-flag";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data, isPending } = useMovieDetailsQuery(movieId ?? "");
  const imgSrc =
    import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + data?.backdrop_path;
  const movieImage = import.meta.env.VITE_TMDB_IMAGE_URL + data?.poster_path;
  const rating = data ? data.vote_average * 10 : 0;
  return (
    <AppLayout>
      <div className="hero min-h-screen">
        <img className="opacity-20" src={imgSrc} />
        {isPending && <Loading />}
        <div className="hero-content flex-col lg:flex-row">
          <img src={movieImage} className="w-96 rounded-lg shadow-2xl" />
          <div>
            <div data-testid='circular-progress-element' className='w-12 h-12 mb-4'>
              <CircularProgressbar styles={buildStyles({
                textSize: '25px',
                pathColor: rating >= 70 ? '#10B981' : rating >= 40 ? '#F59E0B' : '#EF4444',
                textColor: rating >= 70 ? '#10B981' : rating >= 40 ? '#F59E0B' : '#EF4444',
                trailColor: '#374151',

              })} maxValue={100} value={rating} text={`${(rating).toFixed(0)}%`}/>
            </div>

            <h1 className="text-5xl font-bold">{data?.title}</h1>
            <h2 className="text-2xl font-bold">{data?.tagline}</h2>
            <ReactCountryFlag countryCode={data?.origin_country[0] ?? ""}/>
            <p className="py-6">
              {data?.genres.map((genre) => genre.name).join(", ") ?? "N/A"}
            </p>
            <p>{data?.overview}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MovieDetails;
