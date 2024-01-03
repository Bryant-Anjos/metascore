import { Link } from 'expo-router'
import { Text } from 'react-native'
import { tv } from 'tailwind-variants'

import Touchable from '@src/components/ui/Touchable'

export interface GoalProps {
  id: string
  name: string
  active: boolean
}

const text = tv({
  base: 'text-2xl',
  variants: {
    active: {
      true: 'text-dark-success',
      false: 'text-dark-error',
    },
  },
})

export default function Goal({ id, name, active }: GoalProps) {
  return (
    <Link asChild href={`/goals/${id}`}>
      <Touchable className="py-2 border-b-[1px] border-light-borders">
        <Text className={text({ active })}>{name}</Text>
      </Touchable>
    </Link>
  )
}
