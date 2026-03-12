import { useState } from "react";
import type { MovieVideo } from "../types/movies.ts";

type VideoSectionProps = {
  videos: MovieVideo[];
  title?: string;
};

const VIDEO_TYPE_COLORS: Record<string, string> = {
  Trailer: "badge-primary",
  Teaser: "badge-secondary",
  Clip: "badge-accent",
  Featurette: "badge-info",
  "Behind the Scenes": "badge-warning",
  Bloopers: "badge-success",
};

const typeOrder = [
  "Trailer",
  "Teaser",
  "Clip",
  "Featurette",
  "Behind the Scenes",
  "Bloopers",
];

const VideoSection = ({ videos, title }: VideoSectionProps) => {
  const [activeVideo, setActiveVideo] = useState<MovieVideo | null>(null);

  const ytVideos = videos
    .filter((v) => v.site === "YouTube")
    .sort((a, b) => {
      const ai = typeOrder.indexOf(a.type);
      const bi = typeOrder.indexOf(b.type);
      const aIdx = ai === -1 ? typeOrder.length : ai;
      const bIdx = bi === -1 ? typeOrder.length : bi;
      if (aIdx !== bIdx) return aIdx - bIdx;
      return (b.official ? 1 : 0) - (a.official ? 1 : 0);
    });

  if (!ytVideos.length) return null;

  return (
    <section data-testid="video-section">
      <h2 className="text-2xl font-bold mb-6">Videos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ytVideos.slice(0, 12).map((video) => (
          <button
            key={video.id}
            className="group relative overflow-hidden rounded-xl bg-base-300 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setActiveVideo(video)}
            aria-label={`Play ${video.name}`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt={video.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-7 h-7 ml-1"
                  >
                    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82Z" />
                  </svg>
                </div>
              </div>
              {/* Type badge */}
              <span
                className={`absolute top-2 left-2 badge badge-sm ${VIDEO_TYPE_COLORS[video.type] ?? "badge-neutral"}`}
              >
                {video.type}
              </span>
              {video.official && (
                <span className="absolute top-2 right-2 badge badge-sm badge-ghost bg-black/40 text-white border-white/20">
                  Official
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-semibold line-clamp-2 leading-snug">
                {video.name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl p-0 overflow-hidden bg-base-300">
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-content/10">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`badge badge-sm flex-none ${VIDEO_TYPE_COLORS[activeVideo.type] ?? "badge-neutral"}`}
                >
                  {activeVideo.type}
                </span>
                <h3 className="font-bold text-base truncate">
                  {activeVideo.name}
                </h3>
              </div>
              <button
                className="btn btn-sm btn-circle btn-ghost flex-none ml-2"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1`}
                title={`${title ?? "Video"} – ${activeVideo.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setActiveVideo(null)}>close</button>
          </form>
        </dialog>
      )}
    </section>
  );
};

export default VideoSection;
