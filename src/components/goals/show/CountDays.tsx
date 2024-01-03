import { Text, View } from 'react-native'

export interface CountDaysProps {
  total: number
}

export default function CountDays({ total }: CountDaysProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="justify-center items-center border-2 w-40 h-40 rounded-full">
        <Text className="text-8xl font-bold text-light-text mt-4">{total}</Text>
      </View>
    </View>
  )
}
