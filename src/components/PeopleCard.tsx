type PeopleCardProps = {
  onClick: () => void;
  imageSrc?: string;
  gender?: number;
  name: string;
  description: string;
  imageAlt?: string;
  className?: string;
};

const PeopleCard = ({
  onClick,
  imageSrc,
  gender,
  name,
  description,
  imageAlt = "Person",
  className = "",
}: PeopleCardProps) => {
  const placeholderImage =
    gender === 1 ? "/assets/images/woman.png" : "/assets/images/man.png";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl shadow-md cursor-pointer text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`.trim()}
    >
      <div className="aspect-[2/3] overflow-hidden bg-base-300">
        <img
          src={imageSrc || placeholderImage}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
        <h3 className="text-white text-sm font-semibold leading-tight line-clamp-1 mb-0.5">
          {name}
        </h3>
        {description && (
          <p className="text-white/60 text-xs line-clamp-1">{description}</p>
        )}
      </div>
    </button>
  );
};

export default PeopleCard;
