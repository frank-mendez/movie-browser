type PeopleCardProps = {
    onClick: () => void;
    imageSrc: string;
    name: string;
    character: string;
}

const PeopleCard = ({onClick, imageSrc, name, character}: PeopleCardProps) => {
    return (
        <button onClick={onClick}
                className="card bg-base-300 shadow-xl cursor-pointer hover:animate-pulse text-left">
            <figure>
                <img
                    src={imageSrc}
                    alt="cast"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{character}</p>
            </div>
        </button>
    )
}

export default PeopleCard;