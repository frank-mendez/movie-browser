import AppLayout from "../../layout/AppLayout.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useTvShowCreditsQuery,
  useTvShowDetailQuery,
  useTvShowImagesQuery,
  useTvShowVideosQuery,
} from "../../api/tv-show/query/useTvShowQuery.ts";
import { SkeletonGrid } from "../../components/SkeletonCard.tsx";
import TrailerModal from "../../components/TrailerModal.tsx";
import MediaGallery from "../../components/MediaGallery.tsx";
import VideoSection from "../../components/VideoSection.tsx";
import { useWatchlist } from "../../hooks/useWatchlist.ts";
import { useState, useMemo } from "react";
import { WatchlistItem } from "../../types/movies.ts";
import DetailHeroBanner from "../../components/DetailHeroBanner.tsx";
import { getRatingBadgeColor, selectTrailerVideo } from "../../utils/utils.ts";

const TvShowDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { tvShowId } = useParams<{ tvShowId: string }>();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { data, isPending } = useTvShowDetailQuery(tvShowId ?? "");
  const { data: tvShowCredits, isPending: creditsPending } =
    useTvShowCreditsQuery(tvShowId ?? "");
  const { data: videosData } = useTvShowVideosQuery(tvShowId ?? "");
  const { data: imagesData } = useTvShowImagesQuery(tvShowId ?? "");
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const rating = data ? Math.round(data.vote_average * 10) : 0;
  const inWatchlist = data ? isInWatchlist(data.id) : false;

  const trailer = useMemo(
    () => selectTrailerVideo(videosData?.results),
    [videosData],
  );

  const handleToggleWatchlist = () => {
    if (!data) return;
    if (inWatchlist) {
      removeFromWatchlist(data.id);
    } else {
      const item: WatchlistItem = {
        id: data.id,
        name: data.name,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average,
        first_air_date: data.first_air_date,
        media_type: "tv",
        genre_ids: data.genres.map((g) => g.id),
        overview: data.overview,
        adult: data.adult,
        original_language: data.original_language,
        popularity: data.popularity,
        vote_count: data.vote_count,
        original_name: data.original_name,
        origin_country: data.origin_country,
      };
      addToWatchlist(item);
    }
  };

  const ratingColor = getRatingBadgeColor(rating);

  return (
    <AppLayout>
      <div data-testid="tv-show-details-element">
        <DetailHeroBanner
          isPending={isPending}
          backdropPath={data?.backdrop_path}
          posterPath={data?.poster_path}
          title={data?.name}
          voteAverage={data?.vote_average}
          ratingColor={ratingColor}
          originCountry={data?.origin_country}
          mediaBadge={
            data && data.number_of_seasons > 0 ? (
              <span className="badge badge-ghost">
                {data.number_of_seasons} Season
                {data.number_of_seasons > 1 ? "s" : ""}
              </span>
            ) : undefined
          }
          year={data?.first_air_date?.slice(0, 4)}
          tagline={data?.tagline}
          genres={data?.genres}
          overview={data?.overview}
          hasTrailer={!!trailer}
          inWatchlist={inWatchlist}
          onOpenTrailer={() => setTrailerOpen(true)}
          onToggleWatchlist={handleToggleWatchlist}
        />

        {/* Cast, Crew, Videos, Gallery */}
        <div className="container mx-auto px-4 md:px-8 pb-16 mt-10 space-y-14">
          {/* Cast */}
          <section data-testid="cast-element">
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            {(() => {
              if (creditsPending) return <SkeletonGrid count={8} />;
              if ((tvShowCredits?.cast?.length ?? 0) === 0)
                return (
                  <p className="text-base-content/50">
                    No cast information available.
                  </p>
                );
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {tvShowCredits!.cast.slice(0, 16).map((cast) => {
                    const placeholderImage =
                      cast.gender === 1
                        ? "/assets/images/woman.png"
                        : "/assets/images/man.png";
                    const imageSrc = cast.profile_path
                      ? import.meta.env.VITE_TMDB_IMAGE_URL + cast.profile_path
                      : placeholderImage;
                    return (
                      <button
                        key={cast.id}
                        onClick={() => navigate(`/people/${cast.id}`)}
                        className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                      >
                        <div className="aspect-[2/3] overflow-hidden bg-base-300">
                          <img
                            src={imageSrc}
                            alt={cast.name}
                            loading="lazy"
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-white text-xs font-semibold line-clamp-1">
                            {cast.name}
                          </p>
                          <p className="text-white/60 text-xs line-clamp-1">
                            {cast.roles.map((r) => r.character).join(", ")}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </section>

          <section data-testid="crew-element">
            <h2 className="text-2xl font-bold mb-6">Crew</h2>
            {(tvShowCredits?.crew?.length ?? 0) > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {tvShowCredits!.crew.slice(0, 8).map((member) => {
                  const placeholderImage =
                    member.gender === 2
                      ? "/assets/images/man.png"
                      : "/assets/images/woman.png";
                  const imageSrc = member.profile_path
                    ? import.meta.env.VITE_TMDB_IMAGE_URL + member.profile_path
                    : placeholderImage;
                  return (
                    <button
                      key={`${member.id}-${member.department}`}
                      onClick={() => navigate(`/people/${member.id}`)}
                      className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                    >
                      <div className="aspect-[2/3] overflow-hidden bg-base-300">
                        <img
                          src={imageSrc}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs font-semibold line-clamp-1">
                          {member.name}
                        </p>
                        <p className="text-white/60 text-xs line-clamp-1">
                          {member.department}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
          <VideoSection videos={videosData?.results ?? []} title={data?.name} />

          {/* Gallery */}
          <MediaGallery
            backdrops={imagesData?.backdrops ?? []}
            posters={imagesData?.posters ?? []}
            title={data?.name}
          />
        </div>
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        trailerKey={trailer?.key ?? null}
        onClose={() => setTrailerOpen(false)}
        title={data?.name}
      />
    </AppLayout>
  );
};

export default TvShowDetails;
