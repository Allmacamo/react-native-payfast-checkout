# react-native-payfast-checkout

This is a React Native package for integration of Payfast payment gateway into your React Native projects. The package is also compatible with React Native Expo.

![screenshot](screenshot.png)

## Features

- Make a once off payment for any product/service within the app
- Easy to use package for integrating Payfast payment gateway into your React Native app
- Written in TypeScript, providing type definitions and improved developer experience
- Compatible with React Native & React Native Expo

## Upcoming Features

- Recurring Billing / Subscriptions

## Props

### Paystack Props

| Prop               | Type     | Description                                   | Required | Default Value |
| ------------------ | -------- | --------------------------------------------- | -------- | ------------- |
| paymentMethod      | String   | See below                                     | Yes      | cc            |
| transactionDetails | Object   | See below                                     | Yes      | N/A           |
| notifyUrl          | String   | Webhook url for outcome notification          | No       | N/A           |
| sandbox            | Boolean  | Used to set the integration into testing mode | Yes      | false         |
| signature          | Boolean  | Whether to to use singature or not            | Yes      | false         |
| merchantId         | String   | Payfast merchant Id                           | Yes      | N/A           |
| merchantKey        | String   | Payfast merchant key                          | Yes      | N/A           |
| isVisible          | Boolean  | Whether to show the payment window or not     | Yes      | N/A           |
| passPhrase         | String   | Phrase to secure the payload                  | Yes      | N/A           |
| onClose            | Function | Function to close the payment window          | Yes      | N/A           |

### Payment Method

When this field is set, only the SINGLE payment method specified can be used when the customer reaches Payfast. If this field is blank, or not included, then all available payment methods will be shown

Options
| Option | Description|
|--------|------------|
|eft | EFT|
|cc | Credit card|
|dc | Debit card|
|mp | Masterpass Scan to Pay|
|mc | Mobicred|
|sc | SCode|
|ss | SnapScan|
|zp | Zapper|
|mt | MoreTyme|
|rcs| Store card|

### Transaction Details

| Name                 | Type   | Description                               | Required |
| -------------------- | ------ | ----------------------------------------- | -------- |
| customerFirstName    | String | Customer First Name                       | No       |
| customerLastName     | String | Customer Last Name                        | No       |
| customerEmailAddress | String | Customer Email address                    | No       |
| customerPhoneNumber  | String | Customer Phone Number                     | No       |
| reference            | String | Transaction Reference                     | No       |
| amount               | Float  | Transaction Amount in South African Rands | Yes      |
| itemName             | String | Name of item being paid for               | Yes      |
| itemDescription      | String | Description of the item being paid for    | No       |

## How to use the package

Install the latest version of the package
Using Yarn

```
yarn add react-native-payfast-checkout
```

or Npm

```
npm install react-native-payfast-checkout
```

or Expo

```
npx expo install react-native-payfast-checkout
```

Use the package in your cart or checkout screen

```
...
import Payfast from 'react-native-payfast-checkout'
...
const CartScreen = () => {
    ...
    const [showPayfast, setShowPayfast] = useState(false)
    ...
    const transactionDetails = {
        itemName:'iPhone',
        amount: 1500.25
    }
    return <View>
    ...
    <PayFast
        merchantId={process.env.PAYFAST_MERCHANT_ID}
        merchantKey={process.env.PAYFAST_MERCHANT_KEY}
        passPhrase={process.env.PAYFAST_SIGNATURE_PHRASE}
        sandbox
        isVisible={showPayfast}
        onClose={() => setShowPayfast(false)}
        transactionDetails={transactionDetails}
      />
    ...
    </View>
}

export default CartScreen
```

### Official Documentation

For more details you can visit the official Payfast [documentation page](https://developers.payfast.co.za/docs#home)
![Payfast](payfast.png)
