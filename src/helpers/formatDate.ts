export const formatDate = (date: string): string => {
  const now = new Date(Date.now())
  const current = new Date(date)
  const diff = now.getTime() - current.getTime()
  const hours = diff / 1000 / 60 / 60
  if (hours < 1) {
    const minutes = (hours * 60).toFixed(0)
    return `${minutes} minutes ago`
  }
  if (hours > 24) {
    const days = (hours / 24).toFixed(0)
    return `${days} days ago`
  }
  if (hours > 8760) {
    const years = (hours / 24).toFixed(0)
    return `${years} years ago`
  }
  return hours.toFixed(0) + " " + "hours ago"
}
