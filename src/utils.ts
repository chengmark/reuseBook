export const toRelativeTime = (time: number): string => {
  const min = 60 * 1000
  const hr = min * 60
  const day = hr * 24
  const month = day * 30
  const year = day * 365
  const diff = Date.now() - time

  if (diff < min) return Math.round(diff / 1000) + ' seconds ago'
  else if (diff < hr) return Math.round(diff / min) + ' minutes ago'
  else if (diff < day) return Math.round(diff / hr) + ' hours ago'
  else if (diff < month) return Math.round(diff / day) + ' days ago'
  else if (diff < year) return Math.round(diff / month) + ' months ago'
  else return Math.round(diff / year) + ' years ago'
}

export const toDDMMYYYY = (time: number): string => {
  const date = new Date(time)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const month = months[monthIndex]
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export const toStandardTime = (time: number): string => {
  return `${toRelativeTime(time)} (${toDDMMYYYY(time)})`
}
