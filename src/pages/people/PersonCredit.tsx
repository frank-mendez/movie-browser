import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePersonCreditsQuery } from "../../api/people/query/usePeopleQuery.ts";

const CREDIT_SKELETON_KEYS = Array.from({ length: 12 }, (_, i) => `cs-${i}`);

const PersonCredit = () => {
  const navigate = useNavigate();
  const { personId } = useParams<{ personId: string }>();
  const { data, isPending } = usePersonCreditsQuery(personId ?? "");

  const topCredits = useMemo(
    () =>
      [...(data?.cast ?? [])]
        .filter((c) => c.poster_path)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 18),
    [data],
  );

  const handleClick = (id: string, mediaType: string) => {
    if (mediaType === "movie") navigate(`/movies/${id}`);
    else if (mediaType === "tv") navigate(`/tv-shows/${id}`);
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {CREDIT_SKELETON_KEYS.map((key) => (
          <div key={key} className="skeleton aspect-[2/3] rounded-xl" />
        ))}
      </div>
    );
  }

  if (topCredits.length === 0) {
    return (
      <p className="text-base-content/50 text-sm">No credits available.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {topCredits.map((credit, index) => (
        <button
          onClick={() => handleClick(credit.id.toString(), credit.media_type)}
          key={credit.credit_id}
          className="group flex flex-col gap-2 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl animate-fadein"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <div className="aspect-[2/3] overflow-hidden rounded-xl bg-base-300 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20">
            <img
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={import.meta.env.VITE_TMDB_IMAGE_URL + credit.poster_path}
              alt={credit.title ?? credit.name ?? "credit poster"}
            />
          </div>
          <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {credit.title ?? credit.name}
          </p>
          {credit.character && (
            <p className="text-xs opacity-50 line-clamp-1">
              {credit.character}
            </p>
          )}
        </button>
      ))}
    </div>
  );
};

export default PersonCredit;
