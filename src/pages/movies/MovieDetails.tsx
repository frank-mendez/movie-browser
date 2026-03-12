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
import DetailHeroBanner from "../../components/DetailHeroBanner.tsx";
import { getRatingBadgeColor, selectTrailerVideo } from "../../utils/utils.ts";

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

  const ratingColor = getRatingBadgeColor(rating);

  const allCast = movieCredits?.cast ?? [];

  return (
    <AppLayout>
      <div data-testid="movie-details-element">
        <DetailHeroBanner
          isPending={isPending}
          backdropPath={data?.backdrop_path}
          posterPath={data?.poster_path}
          title={data?.title}
          voteAverage={data?.vote_average}
          ratingColor={ratingColor}
          originCountry={data?.origin_country}
          mediaBadge={
            data && data.runtime > 0 ? (
              <span className="badge badge-ghost">
                {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
              </span>
            ) : undefined
          }
          year={data?.release_date?.slice(0, 4)}
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
