import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const getRatingColor = (rating: number) => {
  if (rating >= 70) return "#10B981";
  if (rating >= 40) return "#F59E0B";
  return "#EF4444";
};

const RatingProgress = ({
  rating,
  className = "w-12 h-12",
}: {
  rating: number;
  className?: string;
}) => {
  const color = getRatingColor(rating);

  return (
    <div data-testid="circular-progress-element" className={className}>
      <CircularProgressbar
        styles={buildStyles({
          textSize: "25px",
          pathColor: color,
          textColor: color,
          trailColor: "#374151",
        })}
        maxValue={100}
        value={rating}
        text={`${rating.toFixed(0)}%`}
      />
    </div>
  );
};

export default RatingProgress;
