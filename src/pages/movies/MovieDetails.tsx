import AppLayout from "../../layout/AppLayout.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
  useMovieImagesQuery,
  useMovieVideosQuery,
} from "../../api/movies/query/useMovieQuery.ts";
import { SkeletonGrid } from "../../components/SkeletonCard.tsx";
import PeopleCard from "../../components/PeopleCard.tsx";
import TrailerModal from "../../components/TrailerModal.tsx";
import MediaGallery from "../../components/MediaGallery.tsx";
import VideoSection from "../../components/VideoSection.tsx";
import { useWatchlist } from "../../hooks/useWatchlist.ts";
import { useState, useMemo } from "react";
import { WatchlistItem } from "../../types/movies.ts";
import ReactCountryFlag from "react-country-flag";

const MovieDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { data, isPending } = useMovieDetailsQuery(movieId ?? "");
  const { data: movieCredits, isPending: creditsPending } =
    useMovieCreditsQuery(movieId ?? "");
  const { data: videosData } = useMovieVideosQuery(movieId ?? "");
  const { data: imagesData } = useMovieImagesQuery(movieId ?? "");
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const backdropUrl =
    import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + data?.backdrop_path;
  const posterUrl = import.meta.env.VITE_TMDB_IMAGE_URL + data?.poster_path;
  const rating = data ? Math.round(data.vote_average * 10) : 0;
  const inWatchlist = data ? isInWatchlist(data.id) : false;

  const trailer = useMemo(() => {
    if (!videosData?.results) return null;
    return (
      videosData.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
      ) ??
      videosData.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer",
      ) ??
      videosData.results.find((v) => v.site === "YouTube") ??
      null
    );
  }, [videosData]);

  const handleToggleWatchlist = () => {
    if (!data) return;
    if (inWatchlist) {
      removeFromWatchlist(data.id);
    } else {
      const item: WatchlistItem = {
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average,
        release_date: data.release_date,
        media_type: "movie",
        genre_ids: data.genres.map((g) => g.id),
        overview: data.overview,
        adult: data.adult,
        original_language: data.original_language,
        popularity: data.popularity,
        vote_count: data.vote_count,
        original_title: data.original_title,
        video: data.video,
      };
      addToWatchlist(item);
    }
  };

  let ratingColor: string;
  if (rating >= 70) {
    ratingColor = "badge-success";
  } else if (rating >= 40) {
    ratingColor = "badge-warning";
  } else {
    ratingColor = "badge-error";
  }

  const allCast = movieCredits?.cast ?? [];

  return (
    <AppLayout>
      <div data-testid="movie-details-element">
        {/* Banner hero */}
        <div className="relative w-full min-h-[60vh] flex items-end overflow-hidden">
          {data?.backdrop_path ? (
            <img
              src={backdropUrl}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 bg-base-200" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/60 to-transparent" />

          {isPending && (
            <div
              data-testid="loading-element"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          )}

          {data && (
            <div className="relative z-10 container mx-auto px-4 md:px-8 pb-8 flex flex-col md:flex-row gap-6 items-end">
              {/* Poster */}
              <img
                src={posterUrl}
                alt={data.title}
                loading="lazy"
                className="w-40 md:w-56 rounded-xl shadow-2xl flex-none border border-white/10"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`badge font-bold ${ratingColor}`}>
                    ★ {data.vote_average.toFixed(1)}
                  </span>
                  {data.origin_country?.[0] && (
                    <ReactCountryFlag
                      countryCode={data.origin_country[0]}
                      svg
                      className="text-xl"
                    />
                  )}
                  {data.runtime > 0 && (
                    <span className="badge badge-ghost">
                      {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                    </span>
                  )}
                  <span className="text-sm opacity-60">
                    {data.release_date?.slice(0, 4)}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black mb-1 leading-tight">
                  {data.title}
                </h1>
                {data.tagline && (
                  <p className="italic text-base-content/60 mb-3 text-sm">
                    "{data.tagline}"
                  </p>
                )}

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.genres.map((g) => (
                    <span key={g.id} className="badge badge-outline badge-sm">
                      {g.name}
                    </span>
                  ))}
                </div>

                <p className="text-sm md:text-base leading-relaxed text-base-content/80 max-w-2xl mb-5 line-clamp-4">
                  {data.overview}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <button
                      className="btn btn-primary btn-sm md:btn-md"
                      onClick={() => setTrailerOpen(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82Z" />
                      </svg>
                      Watch Trailer
                    </button>
                  )}
                  <button
                    className={`btn btn-sm md:btn-md ${inWatchlist ? "btn-secondary" : "btn-outline"}`}
                    onClick={handleToggleWatchlist}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={inWatchlist ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cast, Crew, Videos, Gallery */}
        <div className="container mx-auto px-4 md:px-8 pb-16 mt-10 space-y-14">
          {/* Cast */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            {(() => {
              if (creditsPending) return <SkeletonGrid count={8} />;
              if (allCast.length === 0)
                return (
                  <p className="text-base-content/50">
                    No cast information available.
                  </p>
                );
              return (
                <div
                  data-testid="cast-element"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                >
                  {allCast.slice(0, 16).map((cast) => {
                    const genderImage =
                      cast.gender === 1
                        ? "/assets/images/woman.png"
                        : "/assets/images/man.png";
                    const imageSrc = cast.profile_path
                      ? import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path
                      : genderImage;
                    return (
                      <PeopleCard
                        onClick={() => navigate(`/people/${cast.id}`)}
                        key={cast.id}
                        gender={cast.gender}
                        name={cast.name}
                        description={cast.character}
                        imageSrc={imageSrc}
                      />
                    );
                  })}
                </div>
              );
            })()}
          </section>

          {(movieCredits?.crew?.length ?? 0) > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Crew</h2>
              <div
                data-testid="crew-element"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
              >
                {movieCredits!.crew.slice(0, 8).map((member) => {
                  const genderImage =
                    member.gender === 2
                      ? "/assets/images/man.png"
                      : "/assets/images/woman.png";
                  const imageSrc = member.profile_path
                    ? import.meta.env.VITE_TMDB_IMAGE_URL + member.profile_path
                    : genderImage;
                  return (
                    <PeopleCard
                      onClick={() => navigate(`/people/${member.id}`)}
                      key={`${member.id}-${member.job}`}
                      gender={member.gender}
                      name={member.name}
                      description={member.department}
                      imageSrc={imageSrc}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Videos */}
          <VideoSection
            videos={videosData?.results ?? []}
            title={data?.title}
          />

          {/* Gallery */}
          <MediaGallery
            backdrops={imagesData?.backdrops ?? []}
            posters={imagesData?.posters ?? []}
            title={data?.title}
          />
        </div>
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        trailerKey={trailer?.key ?? null}
        onClose={() => setTrailerOpen(false)}
        title={data?.title}
      />
    </AppLayout>
  );
};

export default MovieDetails;
