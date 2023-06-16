import axios from 'axios'
import format from 'date-fns/format'
import { buildQueryString, generateMD5 } from '../Helpers'
import { ChargeCardToken } from '../types'

type Props = {
  version?: string
  merchantId: string
  passphrase: string
  sandbox?: boolean
}

const usePayFast = ({ version, merchantId, passphrase, sandbox }: Props) => {
  const chargeCardToken = async ({ token, total, reference, itemName }: ChargeCardToken) => {
    try {
      const payload = {
        amount: total,
        item_name: itemName,
        m_payment_id: reference,
        'merchant-id': merchantId,
        passphrase,
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(' ', 'T'),
        version: version || 'v1'
      }
      const string = buildQueryString(payload)
      const signature = generateMD5(string)

      let url = `https://api.payfast.co.za/subscriptions/${token}/adhoc`
      if (sandbox) {
        url += '?testing=true'
      }

      const { data } = await axios.post(
        url,
        {
          amount: payload.amount,
          item_name: payload.item_name,
          m_payment_id: payload.m_payment_id
        },
        {
          headers: {
            'merchant-id': merchantId,
            version: version,
            timestamp: payload.timestamp,
            signature
          }
        }
      )
      if (data.data.message.includes('Failure')) {
        throw new Error(data.data.response)
      }
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    chargeCardToken
  }
}

export default usePayFast
