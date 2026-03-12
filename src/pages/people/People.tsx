import AppLayout from "../../layout/AppLayout.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePeopleQuery } from "../../api/people/query/usePeopleQuery.ts";
import { SkeletonGrid } from "../../components/SkeletonCard.tsx";
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
      <div
        data-testid="people-element"
        className="container mx-auto px-4 md:px-8 py-6"
      >
        <SearchBar />

        <h2 className="text-2xl font-bold mt-6 mb-4">Popular People</h2>

        {isPending ? (
          <SkeletonGrid count={10} />
        ) : (data?.results?.length ?? 0) === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-base-content/50 gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="h-16 w-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p className="text-lg font-medium">No people found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {data!.results.map((person) => (
              <PeopleCard
                key={person.id}
                onClick={() => navigate(`/people/${person.id}`)}
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
        )}

        <div className="flex justify-center mt-10">
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
