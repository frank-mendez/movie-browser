import {Link, useParams} from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {usePersonExternalIdsQuery} from "../../api/people/query/usePeopleQuery.ts";

const PersonExternal = () => {
    const {personId} = useParams<{ personId: string }>();
    const {data, isPending} = usePersonExternalIdsQuery(personId ?? "");
    return (
        <div className={`flex flex-row gap-2 ${isPending ? 'skeleton' : ''}`}>
            <Link target="_blank" to={`https://facebook.com/${data?.facebook_id}`}> <FacebookIcon/></Link>
            <Link target="_blank" to={`https://instagram.com/${data?.instagram_id}`}> <InstagramIcon/></Link>
            <Link target="_blank" to={`https://x.com/${data?.twitter_id}`}> <XIcon/></Link>
            <Link target="_blank" to={`https://youtube.com/${data?.youtube_id}`}> <YouTubeIcon/></Link>
        </div>
    )
}

export default PersonExternal;