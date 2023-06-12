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
