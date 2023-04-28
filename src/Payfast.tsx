import { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, SafeAreaView } from 'react-native'
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview'
import { buildQueryString, generateMD5, removeUndefined } from './Helpers'
import Button from './components/Button'
import Flex from './components/Flex'
import StyledText from './components/StyledText'

export type PayFastTransactionDetails = {
  customerFirstName?: string
  customerLastName?: string
  customerEmailAddress?: string
  customerPhoneNumber?: string
  reference?: string
  amount: number
  itemName: string
  itemDescription?: string
}

type Props = {
  paymentMethod?: 'ef' | 'cc' | 'dc' | 'mp' | 'mc' | 'sc' | 'ss' | 'zp' | 'mt' | 'rcs'
  transactionDetails: PayFastTransactionDetails
  notifyUrl?: string
  sandbox?: boolean
  signature?: boolean
  merchantId?: string
  merchantKey?: string
  isVisible: boolean
  passPhrase?: string
  onClose: () => void
}

export const PayFast = ({
  paymentMethod,
  isVisible,
  onClose,
  sandbox,
  transactionDetails,
  notifyUrl,
  signature,
  merchantId,
  merchantKey,
  passPhrase
}: Props) => {
  const [showWeb, setShowWeb] = useState(false)

  const [postBody, setPostBody] = useState('')

  const uri = sandbox
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'http://www.payfast.co.za/eng/process'

  const injectedJavaScript = `
    document.getElementById("error-btn-back").addEventListener("click", function() {
      window.ReactNativeWebView.postMessage("PRESSED_GO_BACK");
    });
  `

  const CUSTOMER_DATA = {
    name_first: transactionDetails?.customerFirstName,
    name_last: transactionDetails?.customerLastName,
    email_address: transactionDetails?.customerEmailAddress,
    cell_number: transactionDetails?.customerPhoneNumber
  }
  const TRANSACTION_DETAILS = {
    m_payment_id: transactionDetails?.reference,
    amount: transactionDetails.amount,
    item_name: transactionDetails.itemName,
    item_description: transactionDetails?.itemDescription,
    payment_method: paymentMethod || 'cc'
  }

  const PAYLOAD = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    notify_url: notifyUrl,
    ...CUSTOMER_DATA,
    ...TRANSACTION_DETAILS
  }

  const CLEAN_PAYLOAD = removeUndefined(PAYLOAD)

  const getQueryString = () => {
    let queryString = buildQueryString(CLEAN_PAYLOAD)
    if (signature) {
      const queryStringWithPassPhrase = queryString + 'passphrase=' + passPhrase
      const signature = generateMD5(queryStringWithPassPhrase)
      queryString += 'signature=' + signature
    }
    setPostBody(queryString)
    setShowWeb(true)
  }

  useEffect(() => {
    if (isVisible) {
      getQueryString()
    }
  }, [isVisible])

  const handleMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'PRESSED_GO_BACK') {
      setShowWeb(false)
      onClose()
    }
  }

  const handleNavigationChange = (event: WebViewNavigation) => {
    if (event.url.includes('finish')) {
      setShowWeb(false)
      setPostBody('')
      onClose()
    }
  }

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
              source={{
                uri,
                headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: postBody
              }}
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

export default PayFast
