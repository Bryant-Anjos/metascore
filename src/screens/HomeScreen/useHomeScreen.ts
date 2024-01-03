import * as Crypto from 'expo-crypto'
import { useEffect, useState } from 'react'

import useDatabase from '@src/shared/hooks/useDatabase'
import getDateParts from '@src/shared/utils/getDateParts'

interface Goal {
  id: string
  name: string
  active: boolean
}

export default function useHomeScreen() {
  const { runQuery } = useDatabase()
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    const [year, month, day] = getDateParts()
    runQuery<any>(
      `SELECT g.*, 
          CASE WHEN gr.goal_id IS NOT NULL THEN 1 ELSE 0 END AS active
        FROM goals g 
        LEFT JOIN goal_records gr ON g.id = gr.goal_id 
          AND gr.year = ? AND gr.month = ? AND gr.day = ?`,
      [year, month, day],
    ).then(response =>
      setGoals(
        response.map(goal => ({ ...goal, active: Boolean(goal.active) })),
      ),
    )
  }, [])

  function addGoal(name: string) {
    const id = Crypto.randomUUID()
    runQuery('INSERT INTO goals (id, name) VALUES (?, ?)', [id, name]).then(
      () => {
        setGoals(state => [...state, { id, name, active: false }])
      },
    )
  }

  return { goals, addGoal }
}
