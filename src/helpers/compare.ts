export const compare = (a: any, b: any) => {
  const firstDate = Number(new Date(a.createdAt))
  const secondDate = Number(new Date(b.createdAt))
  if (firstDate > secondDate) return -1
  if (firstDate < secondDate) return 1
  return 0
}
