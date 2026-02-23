import AppLayout from "../../layout/AppLayout.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
} from "../../api/movies/query/useMovieQuery.ts";
import Loading from "../../components/Loading.tsx";
import ReactCountryFlag from "react-country-flag";
import PeopleCard from "../../components/PeopleCard.tsx";
import RatingProgress from "../../components/RatingProgress.tsx";

const MovieDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const { data, isPending } = useMovieDetailsQuery(movieId ?? "");
  const { data: movieCredits } = useMovieCreditsQuery(movieId ?? "");
  const imgSrc =
    import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + data?.backdrop_path;
  const movieImage = import.meta.env.VITE_TMDB_IMAGE_URL + data?.poster_path;
  const rating = data ? data.vote_average * 10 : 0;

  return (
    <AppLayout>
      <div className="relative">
        <div
          className="hero h-full"
          style={{
            background: `url(${imgSrc})`,
            backgroundRepeat: "no-repeat !important",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-base-100 opacity-70"></div>
          {isPending && <Loading />}
          <div className="hero-content flex-col lg:flex-row relative z-10">
            <img src={movieImage} className="w-96 rounded-lg shadow-2xl" />
            <div>
              <RatingProgress rating={rating} className="w-12 h-12 mb-4" />

              <h1 className="text-5xl font-bold">{data?.title}</h1>
              <h2 className="text-2xl font-bold">{data?.tagline}</h2>
              <ReactCountryFlag countryCode={data?.origin_country[0] ?? ""} />
              <p className="py-6">
                {data?.genres.map((genre) => genre.name).join(", ") ?? "N/A"}
              </p>
              <p>{data?.overview}</p>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-5xl bg-base-100 text-center mt-10">
          Casts
        </h1>
        <div className="container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-4 p-4 md:p-10">
          {movieCredits?.cast.slice(0, 8).map((cast) => {
            const genderImage =
              cast.gender === 1
                ? "/assets/images/man.png"
                : "/assets/images/woman.png";
            const imageSrc = cast.profile_path
              ? import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path
              : genderImage;
            return (
              <PeopleCard
                onClick={() => navigate(`/people/${cast.id}`)}
                key={cast.id}
                name={cast.name}
                character={cast.character}
                imageSrc={imageSrc}
              />
            );
          })}
          {movieCredits?.cast.slice(9, 17).map((cast) => {
            const genderImage =
              cast.gender === 1
                ? "/assets/images/man.png"
                : "/assets/images/woman.png";
            const imageSrc = cast.profile_path
              ? import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path
              : genderImage;
            return (
              <PeopleCard
                onClick={() => navigate(`/people/${cast.id}`)}
                key={cast.id}
                name={cast.name}
                character={cast.character}
                imageSrc={imageSrc}
              />
            );
          })}
        </div>
        <h1 className="font-bold text-5xl bg-base-100 text-center mt-10">
          Crew
        </h1>
        <div className="container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-4 p-4 md:p-10">
          {movieCredits?.crew.slice(0, 8).map((cast) => {
            const genderImage =
              cast.gender === 2
                ? "/assets/images/man.png"
                : "/assets/images/woman.png";
            const imageSrc = cast.profile_path
              ? import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path
              : genderImage;
            return (
              <PeopleCard
                onClick={() => navigate(`/people/${cast.id}`)}
                key={cast.id}
                name={cast.name}
                character={cast.department}
                imageSrc={imageSrc}
              />
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default MovieDetails;
