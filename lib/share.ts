export async function shareContent(title: string, text: string, url: string) {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
        return true
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return false
        }
        throw error
      }
    }
  
    // Fallback to copying to clipboard
    const shareText = `${title}\n\n${text}\n\n${url}`
    await navigator.clipboard.writeText(shareText)
    return "copied"
  }
  
  