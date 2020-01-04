import color from 'onecolor'

export function getRandomColor (hex: string, delta: number) {
  return color(hex).lightness(Math.random() * 2 * delta - delta, true).hex()
}
