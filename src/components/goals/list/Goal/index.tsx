import { Link } from 'expo-router'
import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'
import { tv } from 'tailwind-variants'

import FeatherIcon from '@expo/vector-icons/Feather'
import Radio from '@src/components/ui/Radio'
import Touchable, { TouchableRef } from '@src/components/ui/Touchable'
import Colors from '@src/constants/Colors'
import useTranslation from '@src/shared/hooks/useTranslation'

import useGoal from './useGoal'

export interface GoalProps {
  id: string
  name: string
  checked: boolean
  onCheck: (id: string) => void
}

const text = tv({
  base: 'text-2xl flex-1',
  variants: {
    checked: {
      true: 'text-light-text',
      false: 'text-light-text',
    },
  },
})

interface IconButtonProps {
  icon: React.ComponentProps<typeof FeatherIcon>['name']
  onPress?: () => void
}

const IconButton = forwardRef<TouchableRef, IconButtonProps>(function (
  { icon, onPress },
  ref,
) {
  return (
    <Touchable
      className="rounded-full overflow-hidden h-12 w-12 items-center justify-center"
      ref={ref}
      onPress={onPress}
    >
      <FeatherIcon name={icon} color={Colors.light.text} size={24} />
    </Touchable>
  )
})

export default function Goal(props: GoalProps) {
  const { t } = useTranslation()
  const {
    changeName,
    checked,
    id,
    inputRef,
    inputValue,
    isEditing,
    name,
    setInputValue,
    toggleChecked,
    toggleEditing,
  } = useGoal(props)

  return (
    <View className="my-1 bg-light-white rounded-full overflow-hidden">
      {isEditing ? (
        <View className="flex-row items-center py-2 pl-2">
          <TextInput
            className="flex-1 px-6"
            ref={inputRef}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={changeName}
            returnKeyType="send"
            cursorColor={Colors.light.link}
            placeholder={t('update.placeholder')}
          />
          <IconButton icon="check" onPress={changeName} />
          <IconButton icon="x" onPress={toggleEditing} />
        </View>
      ) : (
        <Link asChild href={`/goals/${id}`}>
          <Touchable className="flex-row items-center py-2 pl-2">
            <Radio checked={checked} onPress={toggleChecked} />
            <Text className={text({ checked })} numberOfLines={3}>
              {name}
            </Text>
            <IconButton icon="edit" onPress={toggleEditing} />
            <IconButton icon="trash-2" />
            <Link asChild href={`/goals/${id}`}>
              <IconButton icon="chevron-right" />
            </Link>
          </Touchable>
        </Link>
      )}
    </View>
  )
}
