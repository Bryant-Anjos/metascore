import { SafeAreaView } from 'react-native-safe-area-context'

export interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <SafeAreaView className="flex-1 px-2">{children}</SafeAreaView>
}
