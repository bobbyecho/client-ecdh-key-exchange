import { API_HOST } from '../configs'
import { decryptAesGcm } from '../lib/aes-gcm'

export async function getRandomSentenceAPI ({ sessionId, secret }) {
  const res = await fetch(`${API_HOST}/random-sentence`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'SessionID': sessionId
    },
    credentials: 'same-origin'
  })

  const body = await res.json()
  if (res.status !== 200) {
    throw new Error(body)
  }

  const { sentence } = body
  console.log({ sentenceResponse: sentence })
  const actualSentence = await decryptAesGcm({ key: secret, ciphertext: sentence })
  
  return { sentence: actualSentence }
}