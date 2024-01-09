import CreateGoal from '@src/components/goals/create/CreateGoal'
import Container from '@src/components/goals/list/Container'
import Goals from '@src/components/goals/list/Goals'
import Title from '@src/components/goals/list/Title'
import useTranslation from '@src/shared/hooks/useTranslation'

import useHomeScreen from './useHomeScreen'

export default function HomeScreen() {
  const { t } = useTranslation()
  const { goals, addGoal, toggleChecked } = useHomeScreen()

  return (
    <Container>
      <Title>{t('app.name')}</Title>
      <CreateGoal onClickButton={addGoal} />
      <Goals items={goals} onCheck={toggleChecked} />
    </Container>
  )
}
