export default function getDateParts(date = new Date()) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day] as [year: number, month: number, day: number]
}
