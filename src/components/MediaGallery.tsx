import { useState } from "react";
import type { MovieImage } from "../types/movies.ts";

type Tab = "backdrops" | "posters";

type MediaGalleryProps = {
  backdrops: MovieImage[];
  posters: MovieImage[];
  title?: string;
};

const BADGE_CLASS =
  "cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const MediaGallery = ({ backdrops, posters, title }: MediaGalleryProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("backdrops");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const imageBase = import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE;
  const images = activeTab === "backdrops" ? backdrops : posters;

  if (!backdrops.length && !posters.length) return null;

  return (
    <section data-testid="media-gallery-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <div className="join">
          {backdrops.length > 0 && (
            <button
              className={`join-item btn btn-sm ${activeTab === "backdrops" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("backdrops")}
            >
              Backdrops{" "}
              <span className="badge badge-sm ml-1">{backdrops.length}</span>
            </button>
          )}
          {posters.length > 0 && (
            <button
              className={`join-item btn btn-sm ${activeTab === "posters" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveTab("posters")}
            >
              Posters{" "}
              <span className="badge badge-sm ml-1">{posters.length}</span>
            </button>
          )}
        </div>
      </div>

      <div
        className={
          activeTab === "backdrops"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
            : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
        }
      >
        {images.slice(0, activeTab === "backdrops" ? 16 : 24).map((img) => (
          <button
            key={img.file_path}
            className={`group relative overflow-hidden rounded-lg bg-base-300 ${BADGE_CLASS} ${
              activeTab === "backdrops" ? "aspect-video" : "aspect-[2/3]"
            }`}
            onClick={() => setLightbox(img.file_path)}
            aria-label={`View ${activeTab === "backdrops" ? "backdrop" : "poster"} image`}
          >
            <img
              src={imageBase + img.file_path}
              alt={title ?? "Gallery image"}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              >
                <path d="M15 3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V5.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L18.586 4H16a1 1 0 0 1-1-1ZM3 15a1 1 0 0 1 1 1v2.586l4.293-4.293a1 1 0 0 1 1.414 1.414L5.414 20H8a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <dialog open className="modal modal-open" aria-label="Image lightbox">
          <div className="modal-box max-w-6xl w-11/12 p-2 bg-black/90 shadow-2xl">
            <div className="flex justify-end mb-1">
              <button
                className="btn btn-sm btn-circle btn-ghost text-white"
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>
            <img
              src={imageBase + lightbox}
              alt={title ?? "Gallery"}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setLightbox(null)}>close</button>
          </form>
        </dialog>
      )}
    </section>
  );
};

export default MediaGallery;
