import {useNavigate, useParams} from "react-router-dom";
import {usePersonCreditsQuery} from "../../api/people/query/usePeopleQuery.ts";

const PersonCredit = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const {personId} = useParams<{ personId: string }>();
    const {data, isPending} = usePersonCreditsQuery(personId ?? "");
    const handleClick = (id: string, mediaType: string) => {
        if (mediaType === "movie") {
            navigate(`/movies/${id}`);
        } else if (mediaType === "tv") {
            navigate(`/tv-shows/${id}`);
        }
    };
    return (
        <div className='grid grid-cols-10 gap-4'>

            {isPending && <div>Loading...</div>}
            {data?.cast.map((credit) => (
                <button onClick={() => handleClick(credit.id.toString(), credit.media_type)}
                        key={credit.credit_id} className='flex flex-col gap-2 text-left'>
                    <div>
                        <img className='rounded-xl'
                             src={import.meta.env.VITE_TMDB_IMAGE_URL + credit.poster_path}/>
                    </div>
                    <p className='text-font text-sm'>{credit.title}</p>
                    <p className='text-xs'>{credit.character}</p>
                </button>
            ))}
        </div>
    )
}

export default PersonCredit;