import { Stack, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

import CheckButton from '@src/components/goals/show/CheckButton'
import Container from '@src/components/goals/show/Container'

import useGoalScreen from './useGoalScreen'
import CountDays from '@src/components/goals/show/CountDays'

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
