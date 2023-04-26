import React, { FC } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

type Props = ViewStyle & {
  onPress?: () => void
  disabled?: boolean
  activeOpacity?: number
  size?: number | string
  children?: React.ReactNode
  borderTopRadius?: number
  borderBottomRadius?: number
  borderLeftRadius?: number
  borderRightRadius?: number
}
const Flex: FC<Props> = ({
  children,
  onPress,
  disabled,
  activeOpacity,
  size,
  borderTopRadius,
  borderBottomRadius,
  borderLeftRadius,
  borderRightRadius,
  ...rest
}) => (
  <TouchableOpacity
    disabled={!onPress || disabled}
    onPress={onPress}
    activeOpacity={activeOpacity}
    style={{
      width: size,
      height: size,
      borderTopLeftRadius: borderTopRadius || borderLeftRadius,
      borderTopRightRadius: borderTopRadius || borderRightRadius,
      borderBottomLeftRadius: borderBottomRadius || borderLeftRadius,
      borderBottomRightRadius: borderBottomRadius || borderRightRadius,
      ...rest
    }}
  >
    {children}
  </TouchableOpacity>
)

export default Flex
