const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-[2/3] bg-base-300" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-base-300 rounded w-3/4" />
      <div className="h-3 bg-base-300 rounded w-1/2" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 10 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
