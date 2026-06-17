export function extractOrigin(url: string): string | null {
  const parsedUrl = URL.parse(url)

  if (parsedUrl?.protocol !== 'https:') {
    return null
  }

  return parsedUrl.origin
}
