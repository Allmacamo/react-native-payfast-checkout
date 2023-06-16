import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, SafeAreaView } from 'react-native'
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview'
import Button from './components/Button'
import Flex from './components/Flex'
import StyledText from './components/StyledText'

type Props = {
  cardToken: string
  sandbox?: boolean
  isVisible: boolean
  passPhrase?: string
  onClose: (isDone?: boolean) => void
}

const UpdateCard = ({ cardToken, isVisible, onClose, sandbox }: Props) => {
  const [showWeb, setShowWeb] = useState(false)

  let uri = sandbox
    ? 'https://sandbox.payfast.co.za/eng/recurring/update/' + cardToken
    : 'https://www.payfast.co.za/eng/recurring/update/' + cardToken

  const injectedJavaScript = `
  document.getElementById("error-btn-back").addEventListener("click", ()=> {
    window.ReactNativeWebView.postMessage("PRESSED_GO_BACK");
  });
  `

  const handleMessage = ({ nativeEvent }: WebViewMessageEvent) => {
    if (nativeEvent.data === 'PRESSED_GO_BACK') {
      setShowWeb(false)
      onClose()
    }
  }

  const handleNavigationChange = (event: WebViewNavigation) => {
    if (event.url.includes('finish')) {
      setShowWeb(false)
      onClose(true)
    }
  }

  useEffect(() => {
    setShowWeb(true)
  }, [isVisible])

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaView style={{ height: '100%' }}>
        {showWeb ? (
          <Flex height="100%" width="100%" justifyContent="center">
            <WebView
              onNavigationStateChange={handleNavigationChange}
              style={{ flex: 1 }}
              startInLoadingState
              injectedJavaScript={injectedJavaScript}
              onMessage={handleMessage}
              renderLoading={() => (
                <Flex height="100%" width="100%" justifyContent="center">
                  <ActivityIndicator size="large" />
                  <Button marginTop={50} text="Cancel" onPress={onClose} />
                </Flex>
              )}
              onError={(error) => (
                <Flex height="100%" width="100%" justifyContent="center">
                  <StyledText>There has been an error</StyledText>
                  <Button marginTop={50} text="Cancel" onPress={onClose} />
                </Flex>
              )}
              source={{ uri }}
            />
          </Flex>
        ) : (
          <Flex height="100%" width="100%" justifyContent="center">
            <ActivityIndicator size="large" />
            <Button marginTop={50} text="Cancel" onPress={onClose} />
          </Flex>
        )}
      </SafeAreaView>
    </Modal>
  )
}

export default UpdateCard
