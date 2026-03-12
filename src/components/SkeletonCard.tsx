const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-[2/3] bg-base-300" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-base-300 rounded w-3/4" />
      <div className="h-3 bg-base-300 rounded w-1/2" />
    </div>
  </div>
);

const MAX_SKELETON_COUNT = 20;
const SKELETON_KEYS = Array.from(
  { length: MAX_SKELETON_COUNT },
  (_, i) => `skeleton-${i}`,
);

export const SkeletonGrid = ({ count = 10 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
    {SKELETON_KEYS.slice(0, count).map((key) => (
      <SkeletonCard key={key} />
    ))}
  </div>
);

export default SkeletonCard;
