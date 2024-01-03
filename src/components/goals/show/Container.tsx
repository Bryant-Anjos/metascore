import Colors from '@src/constants/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export interface ContainerProps {
  title?: string
  checked?: boolean
  children: React.ReactNode
}

export default function Container({
  checked,
  children,
  title,
}: ContainerProps) {
  return (
    <View className="flex-1 p-2 bg-light-background">
      <StatusBar style={checked ? 'light' : 'dark'} />
      <Stack.Screen
        options={{
          title,
          headerShown: true,
          headerStyle: checked
            ? {
                backgroundColor: Colors.light.success,
              }
            : undefined,
          headerTintColor: checked ? Colors.light.white : undefined,
        }}
      />
      {children}
    </View>
  )
}
