import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import useDatabase from '@src/shared/hooks/useDatabase'

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

export default function Goal() {
  const { id } = useLocalSearchParams()
  const { runQuery } = useDatabase()

  const [goal, setGoal] = useState<Goal>()
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    runQuery<Goal>('SELECT * FROM goals WHERE id = ?', [id]).then(([row]) =>
      setGoal(row),
    )
    getYearRecords()
  }, [])

  useEffect(() => {
    console.log('records', records)
  }, [records])

  function getYearRecords() {
    const year = new Date().getFullYear()

    runQuery<Record>(
      'SELECT * FROM goal_records WHERE goal_id = ? AND year = ?',
      [id, year],
    ).then(setRecords)
  }

  function isDoneToday(): boolean {
    const [year, month, day] = new Date()
      .toISOString()
      .split('T')
      .at(0)!
      .split('-')
      .map(Number)
    return records.some(
      record =>
        record.year === year && record.month === month && record.day === day,
    )
  }

  function toogleIsDone() {
    const isDone = isDoneToday()
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

  return (
    <SafeAreaView>
      <Text className="text-2xl">Goal name: {goal?.name}</Text>
      <Text className="text-2xl">Total days: {records.length}</Text>
      <Text className="text-2xl">Is done: {String(isDoneToday())}</Text>
      <Button title="mark as done" onPress={toogleIsDone} />
    </SafeAreaView>
  )
}
