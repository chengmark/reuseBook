// common utilities that will be used in frontend

/**
 * convert Js time in ms to relative time
 *
 * @param timeString time in string format
 * @returns relative time comparing with current time e.g. XX seconds ago, XX hours ago
 */
export const toRelativeTime = (timeString: string): string => {
  const time = getTime(timeString)
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

/**
 * convert Js time in ms to DD-MM-YYYY
 *
 * @param timeString time in string format
 * @returns time in DD-MM-YYYY format
 */
export const toDDMMYYYY = (timeString: string): string => {
  const time = getTime(timeString)
  const date = new Date(time)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const month = months[monthIndex]
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

/**
 * convert time string to Js date object
 *
 * @param timeString time in string format
 * @returns date object
 */
const getTime = (timeString: string) => new Date(timeString).getTime()

/**
 * convert time string to standarized date representation
 *
 * @param timeString time instring format
 * @returns XX time agao DD-MM-YYYY
 */
export const toStandardTime = (timeString: string): string =>
  `${toRelativeTime(timeString)} (${toDDMMYYYY(timeString)})`

/**
 * capitalize the first letter of a string
 * @param string
 * @returns capitalized string
 */
export const capFirst = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * get last segment of current location href
 *
 * @returns last segment of current location href
 */
export const getUrlLastSegmant = () =>
  location.href.substring(location.href.lastIndexOf('/') + 1).replaceAll('%20', ' ')

/**
 * convert time string to YYYY-MM-DD-HH-mm-ss
 * @param timeString
 * @returns YYYY-MM-DD-HH-mm-ss time
 */
export const toPreciseTime = (timeString: string): string => {
  const date = new Date(timeString)
  const DD = ('0' + date.getDate()).slice(-2)
  const MM = ('0' + (date.getMonth() + 1)).slice(-2)
  const YYYY = date.getFullYear()
  const HH = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()
  return YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm + ':' + ss
}

/**
 * generate uuidv4
 *
 * @returns uuidv4
 */
export const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
