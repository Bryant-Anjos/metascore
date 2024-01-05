import { useEffect } from 'react'

import getDateParts from '@src/shared/utils/getDateParts'
import useGoals from '@src/shared/hooks/useGoals'

export default function useHomeScreen() {
  const [year, month, day] = getDateParts()
  const { goals, fetchGoals, addGoal, toggleGoalChecked } = useGoals()

  useEffect(() => {
    fetchGoals(year, month, day)
  }, [])

  function toggleChecked(id: string) {
    toggleGoalChecked(id, year, month, day)
  }

  return { goals, addGoal, toggleChecked }
}
