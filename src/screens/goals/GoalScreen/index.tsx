import { useLocalSearchParams } from 'expo-router'

import CheckButton from '@src/components/goals/show/CheckButton'
import Container from '@src/components/goals/show/Container'
import CountDays from '@src/components/goals/show/CountDays'

import useGoalScreen from './useGoalScreen'

export default function Goal() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { goal, records, isDoneToday, toogleIsDone } = useGoalScreen(id)

  return (
    <Container title={goal?.name} checked={isDoneToday}>
      <CountDays total={records.length} />
      <CheckButton checked={isDoneToday} onPress={toogleIsDone} />
    </Container>
  )
}
