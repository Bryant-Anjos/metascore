import { Link } from 'expo-router'
import { Text, View } from 'react-native'

import Touchable from '@src/components/ui/Touchable'

export interface GoalProps {
  id: string
  name: string
}

export default function Goal({ id, name }: GoalProps) {
  return (
    <Link asChild href={`/goals/${id}`}>
      <Touchable>
        <View>
          <Text className="text-2xl">{name}</Text>
        </View>
      </Touchable>
    </Link>
  )
}
