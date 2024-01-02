import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'

export interface CreateGoalProps {
  onClickButton: (text: string) => void
}

export default function CreateGoal({ onClickButton }: CreateGoalProps) {
  const [text, setText] = useState('')

  function onPress() {
    onClickButton(text)
  }

  return (
    <View className="flex-row">
      <TextInput
        className="flex-1 border-b-[1px]"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={onPress} />
    </View>
  )
}
