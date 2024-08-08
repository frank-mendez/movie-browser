import AppLayout from "../../layout/AppLayout.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import { useSearchParams } from "react-router-dom";
import { usePeopleQuery } from "../../api/people/query/usePeopleQuery.ts";
import Loading from "../../components/Loading.tsx";
import SearchPagination from "../search/SearchPagination.tsx";
import { truncateString } from "../../utils/utils.ts";

const People = () => {
  const [search, setSearch] = useSearchParams();
  const currentPage = parseInt(search.get("page") || "1") - 1;

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
        <div className="grid grid-cols-5 gap-6 items-center mt-10">
          {data &&
            data?.results.length > 0 &&
            data.results.map((person) => (
              <div
                key={person.id}
                className="card bg-base-300 w-500 shadow-xl cursor-pointer hover:animate-pulse"
              >
                <figure>
                  <img
                    src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${person.profile_path}`}
                    alt="Person"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{person.name}</h2>
                  <p>
                    {truncateString(
                      person.known_for
                        .map(
                          (item) =>
                            item.title ?? item.name ?? item.original_name,
                        )
                        .join(", "),
                      40,
                    )}
                  </p>
                </div>
              </div>
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
