import CreateGoal from '@src/components/goals/create/CreateGoal'
import Container from '@src/components/goals/list/Container'
import Goals from '@src/components/goals/list/Goals'

import useHomeScreen from './useHomeScreen'

export default function HomeScreen() {
  const { goals, addGoal } = useHomeScreen()

  return (
    <Container>
      <CreateGoal onClickButton={addGoal} />
      <Goals items={goals} />
    </Container>
  )
}
