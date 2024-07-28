import AppLayout from "../../layout/AppLayout.tsx";
import {useTrendingMoviesQuery} from "../../api/movies/query/useMovieQuery.ts";

const Home = () => {

    const {data, isPending} = useTrendingMoviesQuery()

    return (
        <AppLayout>
            <div data-testid='home-element' className='container flex flex-col gap-4 m-auto p-4'>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search"/>
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
                <div className='flex flex-row gap-4 items-center'>
                    <h1>Trending</h1>
                    <div role="tablist" className="tabs tabs-boxed">
                        <button role="tab" className="tab tab-active">Today</button>
                        <button role="tab" className="tab ">This week</button>
                    </div>
                </div>
                <div className='flex flex-row gap-4 items-center'>
                    {isPending && <div>Loading...</div>}
                    {data && data.results.slice(0, 5).map((movie) => (
                        <div key={movie.id} className="card card-compact bg-base-100 w-96 shadow-xl">
                            <figure>
                                <img
                                    src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
                                    alt="Shoes"/>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{movie.title}</h2>
                                <p>{movie.overview}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

export default Home;