import React from 'react'
import { Text, TextStyle } from 'react-native'

type Props = TextStyle & {
  adjustsFontSizeToFit?: boolean
  allowFontScaling?: boolean | undefined
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined
  lineBreakMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined
  numberOfLines?: number | undefined
  onPress?: () => void
  children: React.ReactNode
}

const StyledText: React.FC<Props> = ({
  children,
  allowFontScaling,
  adjustsFontSizeToFit,
  ellipsizeMode,
  lineBreakMode,
  numberOfLines,
  onPress,
  fontWeight,
  ...rest
}) => {
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={{ color: 'black', ...rest }}
    >
      {children}
    </Text>
  )
}

export default StyledText
