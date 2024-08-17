import AppLayout from "../../layout/AppLayout.tsx";
import {useParams} from "react-router-dom";
import {usePersonDetailsQuery} from "../../api/people/query/usePeopleQuery.ts";
import Loading from "../../components/Loading.tsx";
import PersonCredit from "./PersonCredit.tsx";
import PersonExternal from "./PersonExternal.tsx";

const PersonDetails = () => {
    window.scrollTo(0, 0);
    const { personId } = useParams<{ personId: string }>();
    const {data, isPending} = usePersonDetailsQuery(personId ?? "");
    const imgScr = import.meta.env.VITE_TMDB_IMAGE_URL + data?.profile_path;

    return (
        <AppLayout>
            <div className='container flex flex-row gap-2 m-auto p-6'>
                {isPending && <Loading />}
                <div className='flex flex-col basis-1/4 gap-4'>
                    <img className='rounded-xl' alt='profile'
                         src={imgScr}/>
                    <PersonExternal/>
                    <h1 className='text-2xl font-bold'>Personal Info</h1>
                    <h2 className='text-xl font-bold'>Known For</h2>
                    <p>{data?.known_for_department}</p>
                    <h2 className='text-xl font-bold'>Gender</h2>
                    <p>{data?.gender === 1 ? 'Female' : 'Male'}</p>
                    <h2 className='text-xl font-bold'>Birthday</h2>
                    <p>{data?.birthday}</p>
                    <h2 className='text-xl font-bold'>Place of birth</h2>
                    <p>{data?.place_of_birth}</p>
                </div>
                <div className='flex flex-col basis-3/4 gap-4'>
                    <h1 className='text-4xl font-bold'>{data?.name}</h1>
                    <p className='text-lg font-bold'>Biography</p>
                    <p>{data?.biography}</p>
                    <p className='text-lg font-bold'>Known For</p>
                    <PersonCredit />
                </div>
            </div>
        </AppLayout>
    );
}

export default PersonDetails;