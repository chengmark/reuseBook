export const isEmail = (target: string): boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(target).toLowerCase())
}

export const ONE_DAY = 86400000
export const ONE_WEEK = ONE_DAY * 7
export const ONE_MONTH = ONE_DAY * 30
export const ONE_YEAR = ONE_DAY * 365
