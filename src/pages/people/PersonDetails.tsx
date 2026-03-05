import AppLayout from "../../layout/AppLayout.tsx";
import { useParams } from "react-router-dom";
import { usePersonDetailsQuery } from "../../api/people/query/usePeopleQuery.ts";
import Loading from "../../components/Loading.tsx";
import PersonCredit from "./PersonCredit.tsx";
import PersonExternal from "./PersonExternal.tsx";

const PersonDetails = () => {
  window.scrollTo(0, 0);
  const { personId } = useParams<{ personId: string }>();
  const { data, isPending } = usePersonDetailsQuery(personId ?? "");
  const genderImage =
    data?.gender === 2 ? "/assets/images/man.png" : "/assets/images/woman.png";
  const imgScr = data?.profile_path
    ? import.meta.env.VITE_TMDB_IMAGE_URL + data.profile_path
    : genderImage;

  return (
    <AppLayout>
      <div className="container m-auto flex flex-col gap-6 p-4 md:p-6 lg:flex-row">
        {isPending && <Loading />}
        <div className="flex w-full flex-col gap-4 rounded-xl bg-base-200 p-4 lg:basis-1/3 xl:basis-1/4">
          <img
            className="w-full max-w-sm self-center rounded-xl lg:self-start"
            alt="profile"
            src={imgScr}
          />
          <PersonExternal />
          <section
            aria-labelledby="personal-info-heading"
            className="space-y-3"
          >
            <h2 id="personal-info-heading" className="text-2xl font-bold">
              Personal Info
            </h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-xl font-bold">Known For</dt>
                <dd>{data?.known_for_department}</dd>
              </div>
              <div>
                <dt className="text-xl font-bold">Gender</dt>
                <dd>{data?.gender === 1 ? "Female" : "Male"}</dd>
              </div>
              <div>
                <dt className="text-xl font-bold">Birthday</dt>
                <dd>{data?.birthday}</dd>
              </div>
              <div>
                <dt className="text-xl font-bold">Place of birth</dt>
                <dd>{data?.place_of_birth}</dd>
              </div>
            </dl>
          </section>
        </div>
        <div className="flex w-full flex-col gap-4 lg:basis-2/3 xl:basis-3/4">
          <h1 className="text-3xl font-bold md:text-4xl">{data?.name}</h1>
          <p className="text-lg font-bold">Biography</p>
          <p className="text-sm leading-relaxed md:text-base">
            {data?.biography}
          </p>
          <p className="mt-2 text-lg font-bold">Known For</p>
          <PersonCredit />
        </div>
      </div>
    </AppLayout>
  );
};

export default PersonDetails;
