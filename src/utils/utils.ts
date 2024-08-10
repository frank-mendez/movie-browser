export function truncateString(str: string, num: number): string {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function hasValidImageExtension(url: string): boolean {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const regex = new RegExp(`\\.(${imageExtensions.join("|")})$`, "i");
  return regex.test(url);
}
