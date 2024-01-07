export interface GoalRecord {
  id: number
  goalId: string
  year: number
  month: number
  day: number
}

export interface Goal {
  id: string
  name: string
  checked: boolean
  records: Record<number, GoalRecord[]>
}
