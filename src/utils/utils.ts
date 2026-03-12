export function truncateString(str: string, num: number): string {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function getRatingBadgeColor(rating: number): string {
  if (rating >= 70) return "badge-success";
  if (rating >= 40) return "badge-warning";
  return "badge-error";
}

export function selectTrailerVideo<
  T extends { site: string; type: string; official: boolean },
>(results: T[] | undefined | null): T | null {
  if (!results) return null;
  return (
    results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
    ) ??
    results.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
    results.find((v) => v.site === "YouTube") ??
    null
  );
}

export function hasValidImageExtension(url: string): boolean {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const regex = new RegExp(`\\.(${imageExtensions.join("|")})$`, "i");
  return regex.test(url);
}
