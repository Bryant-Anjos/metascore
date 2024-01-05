import { addDays, subDays } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'

import getDateParts from '@src/shared/utils/getDateParts'
import useGoals from '@src/shared/hooks/useGoals'

export default function useGoalScreen(id: string) {
  const {
    fetchGoalRecords,
    getGoal,
    getGoalRecords,
    isGoalCheckedAtDate,
    toggleGoalCheckedAtDate,
  } = useGoals()

  const [date, setDate] = useState(new Date())

  const [year, month, day] = useMemo(() => getDateParts(date), [date])

  const goal = getGoal(id)
  const records = getGoalRecords(id, year)
  const isDoneToday = isGoalCheckedAtDate(id, year, month, day)

  useEffect(() => {
    fetchGoalRecords(id, year)
  }, [])

  const total = useMemo(() => records?.length ?? 0, [records])

  function toogleIsDone() {
    return toggleGoalCheckedAtDate(id, year, month, day)
  }

  function addDay() {
    setDate(oldDate => addDays(oldDate, 1))
  }

  function subDay() {
    setDate(oldDate => subDays(oldDate, 1))
  }

  return { goal, total, isDoneToday, toogleIsDone, date, addDay, subDay }
}
