import { ReactNode } from 'react'
import { Text } from 'react-native'

interface TitleProps {
  children: ReactNode
}

export default function Title(props: TitleProps) {
  return (
    <Text
      {...props}
      className="text-center text-3xl uppercase mt-4 text-light-text"
    />
  )
}
