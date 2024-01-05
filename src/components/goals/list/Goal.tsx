import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { tv } from 'tailwind-variants'

import Radio from '@src/components/ui/Radio'
import Touchable from '@src/components/ui/Touchable'

export interface GoalProps {
  id: string
  name: string
  checked: boolean
  onCheck: (id: string) => void
}

const text = tv({
  base: 'text-2xl',
  variants: {
    checked: {
      true: 'text-dark-success',
      false: 'text-dark-error',
    },
  },
})

export default function Goal({ id, name, checked, onCheck }: GoalProps) {
  function onPress() {
    onCheck(id)
  }

  return (
    <View className="flex-row items-center border-b-[1px] border-light-borders">
      <Radio checked={checked} onPress={onPress} />
      <Link asChild href={`/goals/${id}`}>
        <Touchable className="w-full py-2">
          <Text className={text({ checked })}>{name}</Text>
        </Touchable>
      </Link>
    </View>
  )
}
