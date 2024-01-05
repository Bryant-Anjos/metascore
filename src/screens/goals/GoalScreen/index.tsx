import { useLocalSearchParams } from 'expo-router'

import CheckButton from '@src/components/goals/show/CheckButton'
import Container from '@src/components/goals/show/Container'
import CountDays from '@src/components/goals/show/CountDays'

import useGoalScreen from './useGoalScreen'
import DateSelector from '@src/components/goals/show/DateSelector'

export default function Goal() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { goal, total, isDoneToday, toogleIsDone, date, addDay, subDay } =
    useGoalScreen(id)

  return (
    <Container title={goal?.name} checked={isDoneToday}>
      <DateSelector date={date} addDay={addDay} subDay={subDay} />
      <CountDays total={total} />
      <CheckButton checked={isDoneToday} onPress={toogleIsDone} />
    </Container>
  )
}
