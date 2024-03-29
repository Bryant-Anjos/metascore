import * as Crypto from 'expo-crypto'
import { ReactNode, createContext, useMemo, useState } from 'react'

import useDatabase from '@src/shared/hooks/useDatabase'
import {
  addGoalQuery,
  changeGoalNameQuery,
  checkGoalQuery,
  deleteGoalQuery,
  listGoalRecordsQuery,
  listGoalsQuery,
  uncheckGoalQuery,
} from '@src/shared/queries/GoalsQueries'
import { Goal, GoalRecord } from '@src/types/goals'

interface GoalsContextValue {
  goals: Goal[]
  fetchGoals(year: number, month: number, day: number): Promise<void>
  fetchGoalRecords(id: string, year: number): Promise<void>
  getGoal(id: string): Goal | undefined
  getGoalRecords(id: string, year: number): GoalRecord[]
  addGoal(name: string): Promise<void>
  deleteGoal(id: string): Promise<void>
  changeGoalName(id: string, name: string): Promise<void>
  isGoalChecked(id: string): boolean
  isGoalCheckedAtDate: (
    id: string,
    year: number,
    month: number,
    day: number,
  ) => boolean
  checkGoal(id: string, year: number, month: number, day: number): Promise<void>
  uncheckGoal(
    id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<void>
  toggleGoalChecked(
    id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<void>
  toggleGoalCheckedAtDate(
    id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<void>
}

export const GoalsContext = createContext<GoalsContextValue>(
  {} as GoalsContextValue,
)

interface GoalsProviderProps {
  children: ReactNode
}

export default function GoalsProvider(props: GoalsProviderProps) {
  const { runQuery } = useDatabase()
  const [goals, setGoals] = useState<Goal[]>([])

  async function fetchGoals(year: number, month: number, day: number) {
    const { params, query } = listGoalsQuery(year, month, day)
    const rows = await runQuery<any>(query, params)
    const fetchedGoals = rows.map(goal => ({
      ...goal,
      checked: Boolean(goal.checked),
      records: {
        [year]: [],
      },
    }))
    setGoals(fetchedGoals)
  }

  async function addGoal(name: string) {
    const id = Crypto.randomUUID()
    const { params, query } = addGoalQuery(id, name)
    await runQuery(query, params)
    const newGoal: Goal = { id, name, checked: false, records: {} }
    setGoals(oldGoals => [...oldGoals, newGoal])
  }

  async function deleteGoal(id: string) {
    const { params, query } = deleteGoalQuery(id)
    await runQuery(query, params)
    setGoals(oldGoals => oldGoals.filter(goal => goal.id !== id))
  }

  async function changeGoalName(id: string, name: string) {
    const { params, query } = changeGoalNameQuery(id, name)
    await runQuery(query, params)
    setGoals(oldGoals =>
      oldGoals.map(goal => (goal.id === id ? { ...goal, name } : goal)),
    )
  }

  async function fetchGoalRecords(id: string, year: number) {
    const { params, query } = listGoalRecordsQuery(id, year)
    const rows = await runQuery<GoalRecord>(query, params)
    setGoals(oldGoals =>
      oldGoals.map(goal =>
        goal.id === id
          ? {
              ...goal,
              records: {
                ...goal.records,
                [year]: rows,
              },
            }
          : goal,
      ),
    )
  }

  const getGoal = useMemo(() => {
    return (id: String) => goals.find(goal => goal.id === id)
  }, [goals])

  const getGoalRecords = useMemo(() => {
    return (id: string, year: number) =>
      goals.find(goal => goal.id === id)?.records[year] ?? []
  }, [goals])

  const isGoalChecked = useMemo(() => {
    return (id: string) => {
      return getGoal(id)?.checked ?? false
    }
  }, [getGoalRecords])

  const isGoalCheckedAtDate = useMemo(() => {
    return (id: string, year: number, month: number, day: number) => {
      return (
        getGoalRecords(id, year)?.some(
          record =>
            record.year === year &&
            record.month === month &&
            record.day === day,
        ) ?? false
      )
    }
  }, [getGoalRecords])

  async function checkGoal(
    id: string,
    year: number,
    month: number,
    day: number,
  ) {
    const { params, query } = checkGoalQuery(id, year, month, day)
    await runQuery(query, params)
    setGoals(oldGoals =>
      oldGoals.map(goal =>
        goal.id === id
          ? {
              ...goal,
              checked: true,
            }
          : goal,
      ),
    )
    await fetchGoalRecords(id, year)
  }

  async function uncheckGoal(
    id: string,
    year: number,
    month: number,
    day: number,
  ) {
    const { params, query } = uncheckGoalQuery(id, year, month, day)
    await runQuery(query, params)
    setGoals(oldGoals =>
      oldGoals.map(goal =>
        goal.id === id
          ? {
              ...goal,
              checked: false,
            }
          : goal,
      ),
    )
    await fetchGoalRecords(id, year)
  }

  async function toggleGoalChecked(
    id: string,
    year: number,
    month: number,
    day: number,
  ) {
    const checked = isGoalChecked(id)
    await (checked
      ? uncheckGoal(id, year, month, day)
      : checkGoal(id, year, month, day))
  }

  async function toggleGoalCheckedAtDate(
    id: string,
    year: number,
    month: number,
    day: number,
  ) {
    const checked = isGoalCheckedAtDate(id, year, month, day)
    await (checked
      ? uncheckGoal(id, year, month, day)
      : checkGoal(id, year, month, day))
  }

  return (
    <GoalsContext.Provider
      {...props}
      value={{
        goals,
        fetchGoals,
        fetchGoalRecords,
        getGoal,
        getGoalRecords,
        addGoal,
        deleteGoal,
        changeGoalName,
        isGoalChecked,
        isGoalCheckedAtDate,
        checkGoal,
        uncheckGoal,
        toggleGoalChecked,
        toggleGoalCheckedAtDate,
      }}
    />
  )
}
