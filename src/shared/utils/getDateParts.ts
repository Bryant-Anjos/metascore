export default function getDateParts(date = new Date()) {
  const [year, month, day] = date
    .toISOString()
    .split('T')
    .at(0)!
    .split('-')
    .map(Number)

  return [year, month, day] as [year: number, month: number, day: number]
}
