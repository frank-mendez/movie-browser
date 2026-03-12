import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { usePersonExternalIdsQuery } from "../../api/people/query/usePeopleQuery.ts";

type SocialEntry = { href: string; icon: ReactNode; label: string };

const EXTERNAL_SKELETON_KEYS = ["es-0", "es-1", "es-2"];

const PersonExternal = () => {
  const { personId } = useParams<{ personId: string }>();
  const { data, isPending } = usePersonExternalIdsQuery(personId ?? "");

  if (isPending) {
    return (
      <div className="flex gap-2">
        {EXTERNAL_SKELETON_KEYS.map((key) => (
          <div key={key} className="skeleton h-9 w-9 rounded-full" />
        ))}
      </div>
    );
  }

  const links: SocialEntry[] = (
    [
      data?.facebook_id
        ? {
            href: `https://facebook.com/${data.facebook_id}`,
            icon: <FacebookIcon fontSize="small" />,
            label: "Facebook",
          }
        : null,
      data?.instagram_id
        ? {
            href: `https://instagram.com/${data.instagram_id}`,
            icon: <InstagramIcon fontSize="small" />,
            label: "Instagram",
          }
        : null,
      data?.twitter_id
        ? {
            href: `https://x.com/${data.twitter_id}`,
            icon: <XIcon fontSize="small" />,
            label: "X (Twitter)",
          }
        : null,
      data?.youtube_id
        ? {
            href: `https://youtube.com/@${data.youtube_id}`,
            icon: <YouTubeIcon fontSize="small" />,
            label: "YouTube",
          }
        : null,
    ] as (SocialEntry | null)[]
  ).filter((l): l is SocialEntry => l !== null);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-row gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          target="_blank"
          rel="noopener noreferrer"
          to={link.href}
          aria-label={link.label}
          className="btn btn-sm btn-ghost btn-circle opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};

export default PersonExternal;
