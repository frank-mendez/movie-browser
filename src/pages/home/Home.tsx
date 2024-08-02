import AppLayout from "../../layout/AppLayout.tsx";
import {useTrendingMoviesQuery} from "../../api/movies/query/useMovieQuery.ts";
import Loading from "../../components/Loading.tsx";
import MovieCard from "../../components/MovieCard.tsx";

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
                    <h1 className='text-4xl my-6'>Trending</h1>
                    <div role="tablist" className="tabs tabs-boxed">
                        <button role="tab" className="tab tab-active">Today</button>
                        <button role="tab" className="tab ">This week</button>
                    </div>
                </div>
                <div className='grid grid-cols-5 gap-6 items-center'>
                    {isPending && <Loading/>}
                    {data && data?.results.length > 0 && <MovieCard movies={data.results}/>}
                </div>
                <div className='flex flex-row gap-4 items-center'>
                    <h1 className='text-4xl my-6'>What's Popular</h1>
                    <div role="tablist" className="tabs tabs-boxed">
                        <button role="tab" className="tab tab-active">Popular</button>
                        <button role="tab" className="tab ">Streaming</button>
                        <button role="tab" className="tab ">On TV</button>
                        <button role="tab" className="tab ">For Rent</button>
                        <button role="tab" className="tab ">In Theaters</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Home;