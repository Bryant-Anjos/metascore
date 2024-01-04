import { useEffect, useMemo } from 'react'

import getDateParts from '@src/shared/utils/getDateParts'
import useGoals from '@src/shared/hooks/useGoals'

export default function useGoalScreen(id: string) {
  const [year, month, day] = getDateParts()
  const {
    fetchGoalRecords,
    getGoal,
    getGoalRecords,
    isGoalChecked,
    toggleGoalChecked,
  } = useGoals()

  const goal = getGoal(id)
  const records = getGoalRecords(id, year)
  const isDoneToday = isGoalChecked(id, year, month, day)

  useEffect(() => {
    fetchGoalRecords(id, year)
  }, [])

  const total = useMemo(() => records?.length ?? 0, [records])

  function toogleIsDone() {
    return toggleGoalChecked(id, year, month, day)
  }

  return { goal, total, isDoneToday, toogleIsDone }
}
