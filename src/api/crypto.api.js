import { API_HOST } from '../configs'

export async function initKeyExchange ({ myPubKey = '' }) {
  const res = await fetch(`${API_HOST}/key-exchange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      publicKey: myPubKey
    }),
    credentials: 'same-origin'
  })
  const body = await res.json()

  if (res.status !== 200) {
    throw new Error(body)
  }

  const { publicKey, sessionId } = body
  
  return { pubKey: publicKey, sessionId }
}