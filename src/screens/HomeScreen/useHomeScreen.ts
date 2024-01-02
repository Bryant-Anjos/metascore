import { useEffect, useState } from 'react'
import * as Crypto from 'expo-crypto'
import useDatabase from '@src/shared/hooks/useDatabase'

interface Goal {
  id: string
  name: string
}

export default function useHomeScreen() {
  const { runQuery } = useDatabase()
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    runQuery<Goal>('SELECT * FROM goals').then(setGoals)
  }, [])

  function addGoal(name: string) {
    const id = Crypto.randomUUID()
    runQuery('INSERT INTO goals (id, name) VALUES (?, ?)', [id, name]).then(
      () => {
        setGoals(state => [...state, { id, name }])
      },
    )
  }

  return { goals, addGoal }
}
