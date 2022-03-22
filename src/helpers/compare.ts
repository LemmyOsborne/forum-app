import { Thread } from "API"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compareDates = (a: any, b: any) => {
  const firstDate = Number(new Date(a.createdAt))
  const secondDate = Number(new Date(b.createdAt))
  if (firstDate > secondDate) return -1
  if (firstDate < secondDate) return 1
  return 0
}

export const compareBySubs = (a: Thread, b: Thread): number => {
  const first = a.subscribers?.length as number
  const second = b.subscribers?.length as number
  if (first > second) return -1
  if (first < second) return 1
  return 0
}
