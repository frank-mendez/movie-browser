import { useEffect, useRef } from "react";

type TrailerModalProps = {
  trailerKey: string | null;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

const TrailerModal = ({
  trailerKey,
  isOpen,
  onClose,
  title,
}: TrailerModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box w-11/12 max-w-4xl p-0 overflow-hidden bg-base-300">
        <div className="flex items-center justify-between px-4 py-3 border-b border-base-content/10">
          <h3 className="font-bold text-lg truncate">{title ?? "Trailer"}</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
            aria-label="Close trailer"
          >
            ✕
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          {trailerKey && isOpen && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={title ?? "Movie Trailer"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default TrailerModal;
