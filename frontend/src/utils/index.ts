export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function isValidUrl(url: string): boolean {
  const urlRegex =
    /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

  return urlRegex.test(url);
}
