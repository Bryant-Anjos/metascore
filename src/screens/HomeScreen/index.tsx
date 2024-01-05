import CreateGoal from '@src/components/goals/create/CreateGoal'
import Container from '@src/components/goals/list/Container'
import Goals from '@src/components/goals/list/Goals'

import useHomeScreen from './useHomeScreen'
import Title from '@src/components/goals/list/Title'

export default function HomeScreen() {
  const { goals, addGoal, toggleChecked } = useHomeScreen()

  return (
    <Container>
      <Title>Metascore</Title>
      <CreateGoal onClickButton={addGoal} />
      <Goals items={goals} onCheck={toggleChecked} />
    </Container>
  )
}
