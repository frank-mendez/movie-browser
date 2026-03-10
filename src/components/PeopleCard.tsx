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
  imageAlt = "cast",
  className = "",
}: PeopleCardProps) => {
  const placeholderImage =
    gender === 1 ? "/assets/images/woman.png" : "/assets/images/man.png";

  return (
    <article
      className={`card bg-base-300 shadow-xl hover:animate-pulse text-left ${className}`.trim()}
    >
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer text-left"
      >
        <figure>
          <img src={imageSrc || placeholderImage} alt={imageAlt} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
        </div>
      </button>
    </article>
  );
};

export default PeopleCard;
