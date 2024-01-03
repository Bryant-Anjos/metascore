import { useEffect, useMemo, useState } from 'react'

import useDatabase from '@src/shared/hooks/useDatabase'
import getDateParts from '@src/shared/utils/getDateParts'

interface Goal {
  id: string
  name: string
}

interface Record {
  id: number
  goal_id: string
  year: number
  month: number
  day: number
}

export default function useGoalScreen(id: string) {
  const { runQuery } = useDatabase()

  const [goal, setGoal] = useState<Goal>()
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    runQuery<Goal>('SELECT * FROM goals WHERE id = ?', [id]).then(([row]) =>
      setGoal(row),
    )
    getYearRecords()
  }, [])

  function getYearRecords() {
    const year = new Date().getFullYear()

    runQuery<Record>(
      'SELECT * FROM goal_records WHERE goal_id = ? AND year = ?',
      [id, year],
    ).then(setRecords)
  }

  const isDoneToday = useMemo(
    function (): boolean {
      const [year, month, day] = getDateParts()
      return records.some(
        record =>
          record.year === year && record.month === month && record.day === day,
      )
    },
    [records],
  )

  function toogleIsDone() {
    const isDone = isDoneToday
    const [year, month, day] = new Date()
      .toISOString()
      .split('T')
      .at(0)!
      .split('-')

    runQuery(
      isDone
        ? 'DELETE FROM goal_records WHERE goal_id = ? AND year = ? AND month = ? AND day = ?;'
        : 'INSERT INTO goal_records (goal_id, year, month, day) VALUES (?, ?, ?, ?);',
      [id, year, month, day],
    ).then(getYearRecords)
  }

  return { goal, records, isDoneToday, toogleIsDone }
}
