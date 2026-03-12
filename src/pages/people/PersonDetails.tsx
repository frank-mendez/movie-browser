import { useState, useEffect } from "react";
import AppLayout from "../../layout/AppLayout.tsx";
import { useParams } from "react-router-dom";
import { usePersonDetailsQuery } from "../../api/people/query/usePeopleQuery.ts";
import Loading from "../../components/Loading.tsx";
import PersonCredit from "./PersonCredit.tsx";
import PersonExternal from "./PersonExternal.tsx";
import Timeline from "./Timeline.tsx";

const formatDate = (dateStr: string | undefined | null): string | null => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calcAge = (
  birthday: string | undefined | null,
  deathday?: string | undefined | null,
): number | null => {
  if (!birthday) return null;
  const end = deathday ? new Date(deathday) : new Date();
  const birth = new Date(birthday);
  let age = end.getFullYear() - birth.getFullYear();
  const m = end.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) age--;
  return age;
};

const BIO_PREVIEW_LEN = 600;

const PersonDetails = () => {
  const { personId } = useParams<{ personId: string }>();
  const { data, isPending } = usePersonDetailsQuery(personId ?? "");
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowFullBio(false);
  }, [personId]);

  const genderImage =
    data?.gender === 2 ? "/assets/images/man.png" : "/assets/images/woman.png";
  const imgSrc = data?.profile_path
    ? import.meta.env.VITE_TMDB_IMAGE_URL + data.profile_path
    : genderImage;

  const age = calcAge(data?.birthday, data?.deathday);
  const hasBioMore = (data?.biography?.length ?? 0) > BIO_PREVIEW_LEN;
  const displayBio =
    hasBioMore && !showFullBio
      ? data!.biography.slice(0, BIO_PREVIEW_LEN) + "\u2026"
      : data?.biography;

  return (
    <AppLayout>
      {isPending && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading />
        </div>
      )}
      {!isPending && (
        <div className="container mx-auto px-4 py-8 md:px-8 animate-fadein">
          {/* ── Hero ─────────────────────────────────────────────── */}
          <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-10">
            <div className="relative shrink-0">
              <div className="h-60 w-44 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-primary/20 md:h-72 md:w-52">
                <img
                  src={imgSrc}
                  alt={data?.name ?? "profile"}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {data?.popularity !== undefined && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 badge badge-primary badge-md shadow-lg whitespace-nowrap">
                  &#9733; {data.popularity.toFixed(1)}
                </span>
              )}
            </div>
            <div
              className="flex flex-col gap-3 text-center sm:text-left animate-slidein"
              style={{ animationDelay: "120ms" }}
            >
              <div>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl leading-tight">
                  {data?.name}
                </h1>
                {data?.known_for_department && (
                  <p className="mt-1 text-base-content/50 text-lg">
                    {data.known_for_department}
                  </p>
                )}
              </div>
              <PersonExternal />
            </div>
          </div>

          {/* ── Two-column layout ────────────────────────────────── */}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <aside
              className="flex flex-col gap-5 animate-fadein"
              style={{ animationDelay: "200ms" }}
            >
              <div className="rounded-2xl bg-base-200 p-5 shadow-sm">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest opacity-50">
                  Personal Info
                </h2>
                <dl className="space-y-4">
                  {data?.known_for_department && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest opacity-40">
                        Known For
                      </dt>
                      <dd className="mt-0.5 font-medium">
                        {data.known_for_department}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest opacity-40">
                      Gender
                    </dt>
                    <dd className="mt-0.5 font-medium">
                      {data?.gender === 1 ? "Female" : "Male"}
                    </dd>
                  </div>
                  {data?.birthday && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest opacity-40">
                        Birthday
                      </dt>
                      <dd className="mt-0.5 font-medium">
                        {formatDate(data.birthday)}
                        {age !== null && !data.deathday && (
                          <span className="ml-2 badge badge-sm badge-ghost">
                            {age} yrs
                          </span>
                        )}
                      </dd>
                    </div>
                  )}
                  {data?.deathday && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest opacity-40">
                        Died
                      </dt>
                      <dd className="mt-0.5 font-medium">
                        {formatDate(data.deathday)}
                        {age !== null && (
                          <span className="ml-2 badge badge-sm badge-ghost">
                            age {age}
                          </span>
                        )}
                      </dd>
                    </div>
                  )}
                  {data?.place_of_birth && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest opacity-40">
                        Place of Birth
                      </dt>
                      <dd className="mt-0.5 font-medium">
                        {data.place_of_birth}
                      </dd>
                    </div>
                  )}
                  {data?.also_known_as && data.also_known_as.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest opacity-40">
                        Also Known As
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1">
                        {data.also_known_as.slice(0, 5).map((alias) => (
                          <span key={alias} className="badge badge-ghost badge-sm">
                            {alias}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex flex-col gap-8">
              {/* Biography */}
              {displayBio && (
                <section
                  className="animate-fadein"
                  style={{ animationDelay: "250ms" }}
                >
                  <h2 className="mb-3 text-xl font-bold">Biography</h2>
                  <div className="rounded-2xl bg-base-200 p-5 shadow-sm">
                    <p className="leading-relaxed text-base-content/80">
                      {displayBio}
                    </p>
                    {hasBioMore && (
                      <button
                        onClick={() => setShowFullBio((v) => !v)}
                        className="btn btn-ghost btn-sm mt-3"
                      >
                        {showFullBio ? "Show less \u2191" : "Read more \u2193"}
                      </button>
                    )}
                  </div>
                </section>
              )}

              {/* Known For */}
              <section
                className="animate-fadein"
                style={{ animationDelay: "300ms" }}
              >
                <h2 className="mb-3 text-xl font-bold">Known For</h2>
                <PersonCredit />
              </section>

              {/* Career Timeline */}
              <section
                className="animate-fadein"
                style={{ animationDelay: "360ms" }}
              >
                <h2 className="mb-3 text-xl font-bold">Career Timeline</h2>
                <Timeline />
              </section>
            </main>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default PersonDetails;
