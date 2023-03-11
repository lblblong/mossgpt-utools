export function getRandomElements<T>(arr: T[], n: number): T[] {
  const res: T[] = []
  const copy = arr.slice()
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * copy.length)
    res.push(copy[index])
    copy.splice(index, 1)
  }
  return res
}