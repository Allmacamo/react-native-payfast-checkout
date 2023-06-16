export type PayFastSubscriptionFrequency =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Quarterly'
  | 'Biannually'
  | 'Annual'

export type PayFastSubscriptionDetails = {
  subscriptionType: number
  billingDate?: string
  recurringAmount?: number
  frequency: PayFastSubscriptionFrequency
  cycles: number
}

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

export type PayFastMerchantDetails = {
  notifyUrl?: string
  sandbox?: boolean
  signature?: boolean
  merchantId?: string
  merchantKey?: string
  passPhrase?: string
}

export type ChargeCardToken = {
  token: string
  total: number
  itemName: string
  itemDescription?: string
  reference: string
}
