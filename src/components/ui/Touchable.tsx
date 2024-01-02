import { ComponentRef, forwardRef } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'

type TouchableNativeFeedbackRef = ComponentRef<typeof TouchableNativeFeedback>

export type TouchableProps = React.ComponentProps<
  typeof TouchableNativeFeedback
> & {
  color?: string
  borderless?: boolean
}

const Touchable = forwardRef<TouchableNativeFeedbackRef, TouchableProps>(
  function (props, ref) {
    const { children, borderless = false, color, ...otherProps } = props

    return (
      <TouchableNativeFeedback
        ref={ref}
        background={TouchableNativeFeedback.Ripple('#00000077', borderless)}
        useForeground
        {...otherProps}
      >
        <View>{children}</View>
      </TouchableNativeFeedback>
    )
  },
)

Touchable.displayName = 'Touchable'

export default Touchable
