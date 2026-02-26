import AppLayout from "../../layout/AppLayout.tsx";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading.tsx";
import ReactCountryFlag from "react-country-flag";
import {
  useTvShowCreditsQuery,
  useTvShowDetailQuery,
} from "../../api/tv-show/query/useTvShowQuery.ts";
import RatingProgress from "../../components/RatingProgress.tsx";

const TvShowDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { tvShowId } = useParams<{ tvShowId: string }>();
  const { data, isPending } = useTvShowDetailQuery(tvShowId ?? "");
  const imgSrc =
    import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + data?.backdrop_path;
  const movieImage = import.meta.env.VITE_TMDB_IMAGE_URL + data?.poster_path;
  const rating = data ? data.vote_average * 10 : 0;
  const { data: tvShowCredits } = useTvShowCreditsQuery(tvShowId ?? "");

  const handleCastClick = (id: number) => {
    navigate(`/people/${id}`);
  };

  return (
    <AppLayout>
      <div data-testid="tv-show-details-element" className="relative">
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
          <div className="hero-content flex-col lg:flex-row">
            <img src={movieImage} className="w-96 rounded-lg shadow-2xl" />
            <div>
              <RatingProgress rating={rating} className="w-12 h-12 mb-4" />
              <h1 className="text-5xl font-bold">{data?.name}</h1>
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
        <div
          data-testid="cast-element"
          className="container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-4 p-4 md:p-10"
        >
          {tvShowCredits?.cast.slice(0, 8).map((cast) => (
            <button
              key={cast.id}
              onClick={() => handleCastClick(cast.id)}
              className="card bg-base-300 shadow-xl cursor-pointer hover:animate-pulse text-left"
            >
              <figure>
                <img
                  src={import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path}
                  alt="cast"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{cast.name}</h2>
                <p>{cast.roles.map((data) => data.character).join("")}</p>
              </div>
            </button>
          ))}
          {tvShowCredits?.cast.slice(9, 17).map((cast) => (
            <button
              key={cast.id}
              onClick={() => handleCastClick(cast.id)}
              className="card bg-base-300 shadow-xl cursor-pointer hover:animate-pulse text-left"
            >
              <figure>
                <img
                  src={import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path}
                  alt="cast"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{cast.name}</h2>
                <p>{cast.roles.map((data) => data.character).join("")}</p>
              </div>
            </button>
          ))}
        </div>
        <h1 className="font-bold text-5xl bg-base-100 text-center mt-10">
          Crew
        </h1>
        <div
          data-testid="crew-element"
          className="container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 gap-4 p-4 md:p-10"
        >
          {tvShowCredits?.crew.slice(0, 8).map((cast) => (
            <button
              key={cast.id}
              onClick={() => handleCastClick(cast.id)}
              className="card bg-base-300 shadow-xl cursor-pointer hover:animate-pulse text-left"
            >
              <figure>
                <img
                  src={import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path}
                  alt="cast"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{cast.name}</h2>
                <p>{cast.department}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default TvShowDetails;
