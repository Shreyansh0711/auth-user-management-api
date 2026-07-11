export const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) return `${Math.floor(interval)} years ago`
  interval = seconds / 2592000
  if (interval > 1) return `${Math.floor(interval)} months ago`
  interval = seconds / 86400
  if (interval > 1) return `${Math.floor(interval)} days ago`
  interval = seconds / 3600
  if (interval > 1) return `${Math.floor(interval)} hours ago`
  interval = seconds / 60
  if (interval > 1) return `${Math.floor(interval)} minutes ago`
  return `${Math.floor(seconds)} seconds ago`
}

export const formatViews = (views) => {
  if (!views) return '0'
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}
