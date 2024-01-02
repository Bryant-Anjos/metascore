import { FlatList } from 'react-native-gesture-handler'

import Goal from './Goal'

interface Goal {
  id: string
  name: string
}

export interface GoalsProps {
  items: Goal[]
}

export default function Goals({ items }: GoalsProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Goal {...item} />}
    />
  )
}
