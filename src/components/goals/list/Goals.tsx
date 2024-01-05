import { FlatList } from 'react-native-gesture-handler'

import Goal from './Goal'

interface Goal {
  id: string
  name: string
  checked: boolean
}

export interface GoalsProps {
  items: Goal[]
  onCheck: (id: string) => void
}

export default function Goals({ items, onCheck }: GoalsProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <Goal {...item} onCheck={onCheck} />}
    />
  )
}
