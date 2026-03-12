import AppLayout from "../../layout/AppLayout.tsx";
import { useWatchlist } from "../../hooks/useWatchlist.ts";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const handleClick = (id: number, mediaType: string) => {
    if (mediaType === "movie") navigate(`/movies/${id}`);
    else if (mediaType === "tv") navigate(`/tv-shows/${id}`);
  };

  const getRatingColor = (rating: number) => {
    const r = Math.round(rating * 10);
    if (r >= 70) return "badge-success";
    if (r >= 40) return "badge-warning";
    return "badge-error";
  };

  return (
    <AppLayout>
      <div
        data-testid="watchlist-element"
        className="container mx-auto px-4 md:px-8 py-8"
      >
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-base-content/60 mt-1 text-sm">
              {watchlist.length} {watchlist.length === 1 ? "title" : "titles"}{" "}
              saved
            </p>
          </div>
          {watchlist.length > 0 && (
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={clearWatchlist}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Clear All
            </button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-base-content/40 gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="h-20 w-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <p className="text-xl font-semibold">Your watchlist is empty</p>
            <p className="text-sm text-center max-w-xs">
              Browse movies and TV shows, then save the ones you want to watch
              later.
            </p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate("/")}
            >
              Discover Titles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {watchlist.map((item) => {
              const title = item.title ?? item.name ?? "Untitled";
              const year = (
                item.release_date ??
                item.first_air_date ??
                ""
              ).slice(0, 4);
              const rating = Math.round(item.vote_average * 10);
              const ratingColor = getRatingColor(item.vote_average);
              const posterUrl = item.poster_path
                ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${item.poster_path}`
                : null;

              return (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => handleClick(item.id, item.media_type)}
                    className="relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20 block"
                  >
                    <div className="aspect-[2/3] bg-base-300 overflow-hidden">
                      {posterUrl ? (
                        <img
                          loading="lazy"
                          src={posterUrl}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-base-content/20">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="h-12 w-12"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125h-.625a1.125 1.125 0 0 1-1.125-1.125V4.875A1.125 1.125 0 0 1 3 3.75h17.25A1.125 1.125 0 0 1 21.375 4.875v13.5A1.125 1.125 0 0 1 20.25 19.5h-.625"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Rating badge */}
                    <span
                      className={`badge ${ratingColor} absolute top-2 right-2 font-bold text-xs`}
                    >
                      {rating}%
                    </span>

                    {/* Media type */}
                    <span className="badge badge-ghost badge-sm absolute top-2 left-2 capitalize">
                      {item.media_type === "tv" ? "TV" : "Film"}
                    </span>

                    {/* Bottom overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                      <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-0.5">
                        {title}
                      </h3>
                      {year && <p className="text-white/60 text-xs">{year}</p>}
                    </div>
                  </button>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    aria-label={`Remove ${title} from watchlist`}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity btn btn-xs btn-circle btn-error z-10"
                    style={{ marginTop: "1.5rem" }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Watchlist;
