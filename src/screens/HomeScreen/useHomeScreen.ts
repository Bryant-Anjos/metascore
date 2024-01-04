import { useEffect } from 'react'

import getDateParts from '@src/shared/utils/getDateParts'
import useGoals from '@src/shared/hooks/useGoals'

export default function useHomeScreen() {
  const { goals, fetchGoals, addGoal } = useGoals()

  useEffect(() => {
    const [year, month, day] = getDateParts()
    fetchGoals(year, month, day)
  }, [])

  return { goals, addGoal }
}
