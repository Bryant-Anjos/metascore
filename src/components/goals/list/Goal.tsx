import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export interface GoalProps {
  id: string
  name: string
}

export default function Goal({ id, name }: GoalProps) {
  return (
    <Link asChild href={`/goals/${id}`}>
      <Pressable>
        <View>
          <Text className="text-2xl">{name}</Text>
        </View>
      </Pressable>
    </Link>
  )
}
