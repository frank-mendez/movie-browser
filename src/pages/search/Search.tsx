import AppLayout from "../../layout/AppLayout.tsx";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieKeywordQuery } from "../../api/search/query/useSearchMovieKeywordQuery.ts";
import { useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const { data: movieData, isPending: moviePending } =
    useSearchMovieKeywordQuery(search.toString());

  useEffect(() => {
    if (movieData) console.log(movieData);
  }, [movieData, moviePending]);

  return (
    <AppLayout>
      <div className="container m-auto">
        <div className="flex flex-row gap-2 my-10">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Search for a movie, tv show, person"
            value={search.get("query") || ""}
            onChange={(e) => setSearch({ query: e.target.value })}
          />
          <button className="btn">Search</button>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col flex-none gap-4">
            <h1 className="text-4xl my-6">Search Results</h1>
            <button className="btn justify-between btn-active">
              Movies
              <div className="badge badge-info">+99</div>
            </button>
            <button className="btn justify-between">
              TV Shows
              <div className="badge badge-info">+99</div>
            </button>
            <button className="btn justify-between">
              People
              <div className="badge badge-info">+99</div>
            </button>
            <button className="btn justify-between">
              Keywords
              <div className="badge badge-info">+99</div>
            </button>
            <button className="btn justify-between">
              Collections
              <div className="badge badge-info">+99</div>
            </button>
            <button className="btn justify-between">
              Networks
              <div className="badge badge-info">+99</div>
            </button>
          </div>
          <div className="flex flex-col flex-1">
            <div className="card card-side bg-base-200 shadow-xl w-full">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
              </div>
            </div>
            <div className="join m-auto">
              <button className="join-item btn">1</button>
              <button className="join-item btn btn-active">2</button>
              <button className="join-item btn">3</button>
              <button className="join-item btn">4</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
