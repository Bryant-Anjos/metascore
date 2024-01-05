import { View } from 'react-native'

import Touchable from '@src/components/ui/Touchable'

export interface RadioProps {
  checked: boolean
  onPress: () => void
}

export default function Radio({ checked, onPress }: RadioProps) {
  return (
    <Touchable
      className="w-6 h-6 border-2 rounded-full overflow-hidden border-light-success p-0.5 mr-2"
      onPress={onPress}
    >
      {checked ? (
        <View className="w-full h-full bg-light-success rounded-full" />
      ) : null}
    </Touchable>
  )
}
