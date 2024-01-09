import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { Text, View } from 'react-native'

import FeatherIcon from '@expo/vector-icons/Feather'
import Touchable from '@src/components/ui/Touchable'
import useTranslation from '@src/shared/hooks/useTranslation'

export interface DateSelectorProps {
  date: Date
  addDay: () => void
  subDay: () => void
}

function getLocale(locale: string) {
  const locales = {
    pt: ptBR,
    en: enUS,
  }

  return locales[locale as keyof typeof locales] ?? locales.pt
}

export default function DateSelector({
  date,
  addDay,
  subDay,
}: DateSelectorProps) {
  const { locale } = useTranslation()

  return (
    <View className="flex-row items-center justify-around">
      <Touchable
        className="rounded-full overflow-hidden items-center justify-center"
        onPress={subDay}
      >
        <FeatherIcon name="chevron-left" size={50} />
      </Touchable>
      <Text className="text-xl">
        {format(date, "EE, dd 'de' MMMM 'de' yyyy", {
          locale: getLocale(locale),
        })}
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
