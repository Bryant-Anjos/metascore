import useTranslation from '@src/shared/hooks/useTranslation'
import { Text, View } from 'react-native'

export interface CountDaysProps {
  total: number
}

export default function CountDays({ total }: CountDaysProps) {
  const { t } = useTranslation()

  return (
    <View className="flex-1 justify-center items-center my-4">
      <View className="justify-center items-center border-2 w-40 h-40 rounded-full">
        <Text className="text-base font-bold text-light-text">
          {t('show.total')}
        </Text>
        <Text className="text-8xl font-bold text-light-text mt-2">{total}</Text>
      </View>
    </View>
  )
}
