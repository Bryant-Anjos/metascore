import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

import FeatherIcon from '@expo/vector-icons/Feather'
import Touchable from '@src/components/ui/Touchable'
import Colors from '@src/constants/Colors'
import useTranslation from '@src/shared/hooks/useTranslation'

export interface CreateGoalProps {
  onClickButton: (text: string) => void
}

export default function CreateGoal({ onClickButton }: CreateGoalProps) {
  const { t } = useTranslation()

  const [text, setText] = useState('')

  function onPress() {
    if (text) {
      onClickButton(text.trim())
      setText('')
    }
  }

  return (
    <View className="flex-row my-4">
      <TextInput
        className="flex-1 bg-light-white rounded-full h-12 px-6"
        value={text}
        onChangeText={setText}
        cursorColor={Colors.light.link}
        placeholder={t('create.placeholder')}
      />
      <Touchable
        onPress={onPress}
        className="absolute bg-light-link rounded-r-full right-0 h-12 px-4 justify-center overflow-hidden"
      >
        <Text className="text-light-white text-base font-bold uppercase">
          <FeatherIcon name="plus" color={Colors.light.white} size={24} />
        </Text>
      </Touchable>
    </View>
  )
}
