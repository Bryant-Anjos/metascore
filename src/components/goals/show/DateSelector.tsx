import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Text, View } from 'react-native'

import FeatherIcon from '@expo/vector-icons/Feather'
import Touchable from '@src/components/ui/Touchable'

export interface DateSelectorProps {
  date: Date
  addDay: () => void
  subDay: () => void
}

export default function DateSelector({
  date,
  addDay,
  subDay,
}: DateSelectorProps) {
  return (
    <View className="flex-row items-center justify-around">
      <Touchable
        className="rounded-full overflow-hidden items-center justify-center"
        onPress={subDay}
      >
        <FeatherIcon name="chevron-left" size={50} />
      </Touchable>
      <Text className="text-xl">
        {format(date, "EE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </Text>
      <Touchable
        className="rounded-full overflow-hidden items-center justify-center"
        onPress={addDay}
      >
        <FeatherIcon name="chevron-right" size={50} />
      </Touchable>
    </View>
  )
}
