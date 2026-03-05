type PeopleCardProps = {
  onClick: () => void;
  imageSrc?: string;
  gender?: number;
  name: string;
  character: string;
};

const PeopleCard = ({
  onClick,
  imageSrc,
  gender,
  name,
  character,
}: PeopleCardProps) => {
  const placeholderImage =
    gender === 1 ? "/assets/images/woman.png" : "/assets/images/man.png";

  return (
    <button
      onClick={onClick}
      className="card bg-base-300 shadow-xl cursor-pointer hover:animate-pulse text-left"
    >
      <figure>
        <img src={imageSrc || placeholderImage} alt="cast" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{character}</p>
      </div>
    </button>
  );
};

export default PeopleCard;
