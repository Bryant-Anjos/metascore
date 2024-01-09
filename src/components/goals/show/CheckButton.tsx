import { Text } from 'react-native'
import { tv } from 'tailwind-variants'

import Touchable from '@src/components/ui/Touchable'
import useTranslation from '@src/shared/hooks/useTranslation'

export interface CheckButtonProps {
  checked: boolean
  onPress: () => void
}

const button = tv({
  base: 'rounded-full py-4 overflow-hidden absolute bottom-4 w-11/12 self-center border-light-success border-2',
  variants: {
    checked: {
      true: 'bg-light-background',
      false: 'bg-light-success',
    },
  },
})

const text = tv({
  base: 'text-light-white text-center uppercase font-bold text-xl',
  variants: {
    checked: {
      true: 'text-light-success',
      false: 'text-light-white',
    },
  },
})

export default function CheckButton({ checked, onPress }: CheckButtonProps) {
  const { t } = useTranslation()

  return (
    <Touchable className={button({ checked })} onPress={onPress}>
      <Text className={text({ checked })}>
        {t(checked ? 'update.uncheck' : 'update.check')}
      </Text>
    </Touchable>
  )
}
