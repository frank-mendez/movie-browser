import AppLayout from "../../layout/AppLayout.tsx";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading.tsx";
import ReactCountryFlag from "react-country-flag";
import {useTvShowDetailQuery} from "../../api/tv-show/query/useTvShowQuery.ts";

const TvShowDetails = () => {
    const { tvShowId } = useParams<{ tvShowId: string }>();
    const { data, isPending } = useTvShowDetailQuery(tvShowId ?? "");
    const imgSrc =
        import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + data?.backdrop_path;
    const movieImage = import.meta.env.VITE_TMDB_IMAGE_URL + data?.poster_path;

    return (
        <AppLayout>
            <div className="hero min-h-screen">
                <img className="opacity-20" src={imgSrc} />
                {isPending && <Loading />}
                <div className="hero-content flex-col lg:flex-row">
                    <img src={movieImage} className="w-96 rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{data?.name}</h1>
                        <h2 className="text-2xl font-bold">{data?.tagline}</h2>
                        <ReactCountryFlag countryCode={data?.origin_country[0] ?? ""} />
                        <p className="py-6">
                            {data?.genres.map((genre) => genre.name).join(", ") ?? "N/A"}
                        </p>
                        <p>{data?.overview}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default TvShowDetails;