import { useLocalSearchParams } from 'expo-router'

import CheckButton from '@src/components/goals/show/CheckButton'
import Container from '@src/components/goals/show/Container'
import CountDays from '@src/components/goals/show/CountDays'

import useGoalScreen from './useGoalScreen'
import DateSelector from '@src/components/goals/show/DateSelector'
import GoalCalendar from '@src/components/goals/show/GoalCalendar'
import { ScrollView } from 'react-native-gesture-handler'

export default function Goal() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const {
    goal,
    records,
    total,
    isDoneToday,
    toogleIsDone,
    date,
    addDay,
    subDay,
    changeDate,
  } = useGoalScreen(id)

  return (
    <Container title={goal?.name} checked={isDoneToday}>
      <DateSelector date={date} addDay={addDay} subDay={subDay} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CountDays total={total} />
        <GoalCalendar date={date} records={records} changeDate={changeDate} />
      </ScrollView>
      <CheckButton checked={isDoneToday} onPress={toogleIsDone} />
    </Container>
  )
}
