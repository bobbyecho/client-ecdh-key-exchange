import { API_HOST } from '../configs'
import { decryptAesGcm, encryptAesGcm } from '../lib/aes-gcm'

export async function sendSomethingAPI ({ secret, payload, sessionId }) {
  const res = await fetch(`${API_HOST}/send-something`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'SessionID': sessionId
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      payload: await encryptAesGcm({ key: secret, payload })
    })
  })

  const body = await res.json()

  if (res.status !== 200) {
    return {
      status: false
    }
  }

  console.log(body)

  const { status } = body
  return { status }
}