import { forwardRef } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { tv } from 'tailwind-variants'

import FeatherIcon from '@expo/vector-icons/Feather'
import Touchable, { TouchableRef } from '@src/components/ui/Touchable'
import Colors from '@src/constants/Colors'
import useGoals from '@src/shared/hooks/useGoals'
import useTranslation from '@src/shared/hooks/useTranslation'

interface IconButtonProps {
  icon: React.ComponentProps<typeof FeatherIcon>['name']
  onPress?: () => void
  color?: string
  style?: ViewStyle
  className?: string
}

const iconButton = tv({
  base: 'rounded-full overflow-hidden h-16 w-16 mx-4 mt-2 items-center justify-center border',
})

const IconButton = forwardRef<TouchableRef, IconButtonProps>(function (
  { icon, color, style, className, onPress },
  ref,
) {
  return (
    <Touchable
      style={style}
      className={iconButton({ className })}
      ref={ref}
      onPress={onPress}
    >
      <FeatherIcon name={icon} color={color} size={36} />
    </Touchable>
  )
})

export interface DeleteGoalProps {
  visible: boolean
  id: string
  name: string
  close: () => void
}

export default function DeleteGoal({
  id,
  name,
  visible,
  close,
}: DeleteGoalProps) {
  const { t } = useTranslation()
  const { deleteGoal } = useGoals()

  async function onConfirm() {
    await deleteGoal(id)
    close()
  }

  return (
    <Modal isVisible={visible} backdropOpacity={0.3}>
      <View className="bg-light-white rounded-xl p-4">
        <Text className="text-light-text text-2xl text-center">
          {t('delete.confirmation')}
          <Text className="font-bold text-light-success">{name}</Text>?
        </Text>
        <View className="flex-row items-center justify-center">
          <IconButton
            icon="check"
            className="border-light-success"
            color={Colors.light.success}
            onPress={onConfirm}
          />
          <IconButton
            icon="x"
            className="border-light-error"
            color={Colors.light.error}
            onPress={close}
          />
        </View>
      </View>
    </Modal>
  )
}
