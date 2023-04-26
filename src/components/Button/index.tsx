import React, { ReactNode } from 'react'
import { ActivityIndicator, TouchableOpacity, ViewStyle } from 'react-native'
import Flex from '../Flex'
import StyledText from '../StyledText'

type Props = ViewStyle & {
  text: string
  textColor?: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
  outline?: boolean
  icon?: ReactNode
  fontSize?: number
}

const StyledButton = ({
  text,
  onPress,
  textColor,
  loading,
  disabled,
  outline,
  icon,
  fontSize,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled || loading ? 1 : undefined}
      onPress={() => {
        if (disabled) {
          return false
        }
        return onPress()
      }}
      style={{
        ...defaultStyling,
        ...rest,
        backgroundColor: "#156332"
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Flex flexDirection="row" alignItems="center">
          <StyledText
          >
            {text}
          </StyledText>
        </Flex>
      )}
    </TouchableOpacity>
  )
}

const defaultStyling: ViewStyle = {
  height: 48,
  width: 200,
  alignSelf: 'center',
  backgroundColor: '#156332',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderRadius: 10
}

export default StyledButton
