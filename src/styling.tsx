// defines global custom stylings
export const parseRGB = (hex: string, alpha?: number): string => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 6), 16)

  if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`
  return `rgba(${r}, ${g}, ${b})`
}

export const Transition = {
  hover: {
    on: '0.2s',
    off: '0.2s',
  },
}
