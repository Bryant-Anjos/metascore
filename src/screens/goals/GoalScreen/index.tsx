import { Stack, useLocalSearchParams } from 'expo-router'
import { Button, Text, View } from 'react-native'

import useGoalScreen from './useGoalScreen'

export default function Goal() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { goal, records, isDoneToday, toogleIsDone } = useGoalScreen(id)

  return (
    <View>
      <Stack.Screen
        options={{
          title: goal?.name,
          headerShown: true,
        }}
      />
      <Text className="text-2xl">Total days: {records.length}</Text>
      <Text className="text-2xl">Is done: {String(isDoneToday())}</Text>
      <Button title="mark as done" onPress={toogleIsDone} />
    </View>
  )
}
