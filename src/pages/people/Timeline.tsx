import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePersonCreditsQuery } from "../../api/people/query/usePeopleQuery.ts";
import type { Cast } from "../../types/people.ts";

const TIMELINE_SKELETON_KEYS = ["ts-0", "ts-1", "ts-2", "ts-3", "ts-4"];

const getYear = (credit: Cast): number | null => {
  const dateStr = credit.release_date ?? credit.first_air_date;
  if (!dateStr) return null;
  return Number.parseInt(dateStr.slice(0, 4), 10);
};

const Timeline = () => {
  const navigate = useNavigate();
  const { personId } = useParams<{ personId: string }>();
  const { data, isPending } = usePersonCreditsQuery(personId ?? "");

  const grouped = useMemo(() => {
    const credits = data?.cast ?? [];
    const map: Record<number, Cast[]> = {};
    for (const credit of credits) {
      const year = getYear(credit);
      if (!year) continue;
      if (!map[year]) map[year] = [];
      map[year].push(credit);
    }
    return Object.entries(map)
      .sort(([a], [b]) => Number.parseInt(b) - Number.parseInt(a))
      .slice(0, 15);
  }, [data]);

  const handleClick = (id: string, mediaType: string) => {
    if (mediaType === "movie") navigate(`/movies/${id}`);
    else if (mediaType === "tv") navigate(`/tv-shows/${id}`);
  };

  if (isPending) {
    return (
      <div className="rounded-2xl bg-base-200 p-5 shadow-sm space-y-4">
        {TIMELINE_SKELETON_KEYS.map((key) => (
          <div key={key} className="flex gap-4 items-start">
            <div className="skeleton h-5 w-10 rounded" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (grouped.length === 0) return null;

  return (
    <div className="rounded-2xl bg-base-200 p-5 shadow-sm">
      <div className="relative">
        {/* Vertical connector line */}
        <div
          className="absolute left-[2.75rem] top-2 bottom-2 w-px bg-base-content/10"
          aria-hidden="true"
        />
        <ol className="list-none space-y-0 m-0 p-0">
          {grouped.map(([year, credits], groupIndex) => (
            <li
              key={year}
              className="relative flex gap-4 pb-6 last:pb-0 animate-fadein"
              style={{ animationDelay: `${groupIndex * 40}ms` }}
            >
              {/* Year badge */}
              <div className="relative z-10 shrink-0 w-16 pt-0.5">
                <span className="badge badge-primary badge-sm font-bold">
                  {year}
                </span>
              </div>
              {/* Credits list */}
              <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
                {credits.slice(0, 5).map((credit) => (
                  <li key={credit.credit_id}>
                    <button
                      onClick={() =>
                        handleClick(credit.id.toString(), credit.media_type)
                      }
                      className="group text-left hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      <span className="font-medium text-sm group-hover:underline">
                        {credit.title ?? credit.name}
                      </span>
                      {credit.character && (
                        <span className="ml-1.5 text-xs opacity-50">
                          as {credit.character}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
                {credits.length > 5 && (
                  <li>
                    <span className="text-xs opacity-40">
                      +{credits.length - 5} more
                    </span>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Timeline;
