import { Text } from 'react-native'
import { tv } from 'tailwind-variants'

import Touchable from '@src/components/ui/Touchable'

export interface CheckButtonProps {
  checked: boolean
  onPress: () => void
}

const button = tv({
  base: 'rounded-full py-4 overflow-hidden absolute bottom-4 w-11/12 self-center border-light-link border-2',
  variants: {
    checked: {
      false: 'bg-light-link',
    },
  },
})

const text = tv({
  base: 'text-light-white text-center uppercase font-bold text-xl',
  variants: {
    checked: {
      true: 'text-light-link',
      false: 'text-light-white',
    },
  },
})

export default function CheckButton({ checked, onPress }: CheckButtonProps) {
  return (
    <Touchable className={button({ checked })} onPress={onPress}>
      <Text className={text({ checked })}>
        Mark as {checked ? 'Undone' : 'Done'}
      </Text>
    </Touchable>
  )
}
