import AppLayout from "../../layout/AppLayout.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePeopleQuery } from "../../api/people/query/usePeopleQuery.ts";
import Loading from "../../components/Loading.tsx";
import SearchPagination from "../search/SearchPagination.tsx";
import { truncateString } from "../../utils/utils.ts";
import PeopleCard from "../../components/PeopleCard.tsx";

const People = () => {
  const [search, setSearch] = useSearchParams();
  const currentPage = Number.parseInt(search.get("page") || "1", 10) - 1;
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setSearch({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  const { data, isPending } = usePeopleQuery(currentPage + 1);
  return (
    <AppLayout>
      <div data-testid="people-element" className="container m-auto p-6">
        <SearchBar />
        {isPending && <Loading />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 items-center mt-10">
          {data &&
            data?.results.length > 0 &&
            data.results.map((person) => (
              <PeopleCard
                key={person.id}
                onClick={() => {
                  navigate(`/people/${person.id}`);
                }}
                className="w-full"
                imageAlt="Person"
                imageSrc={`${import.meta.env.VITE_TMDB_IMAGE_URL}${person.profile_path}`}
                name={person.name}
                description={truncateString(
                  person.known_for
                    .map(
                      (item) => item.title ?? item.name ?? item.original_name,
                    )
                    .join(", "),
                  40,
                )}
              />
            ))}
        </div>
        <div className="flex flex-row m-auto items-center my-10">
          <SearchPagination
            currentPage={currentPage}
            data={data}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default People;
