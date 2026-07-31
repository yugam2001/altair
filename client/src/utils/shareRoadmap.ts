export type ShareResult = 'shared' | 'copied'

export async function shareRoadmap(title: string): Promise<ShareResult> {
  const url = window.location.href
  const shareData = {
    title: `${title} | ALTAIR`,
    text: 'Check out my personalised learning roadmap from ALTAIR.',
    url,
  }

  if (typeof navigator.share === 'function' && navigator.canShare?.(shareData) !== false) {
    try {
      await navigator.share(shareData)
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }
    }
  }

  await navigator.clipboard.writeText(url)
  return 'copied'
}
