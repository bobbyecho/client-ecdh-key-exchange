import { decodeHexToBytes, encodeByteToHex } from "../utils"

const dec = new TextDecoder()
const enc = new TextEncoder()

export async function decryptAesGcm({ key, ciphertext }) {
  try {
    const [ivPart, chipperTextPart] = ciphertext.split('.')
    
    const iv = decodeHexToBytes(ivPart)
    const actualChipperText = decodeHexToBytes(chipperTextPart)

    // const iv = decodeBase64Bytes(ivPart)
    // const actualChipperText = decodeBase64Bytes(chipperTextPart)

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      actualChipperText
    )

    return dec.decode(decrypted).replace(/"/g, '')
  } catch (error) {
    throw new Error('decryption failed')
  }
}


export async function encryptAesGcm({ key, payload }) {
  try {
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encoded = enc.encode(payload)
    const encrypted = new Uint8Array(await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encoded
    ))
    
    console.log({
      encrptedPayload: encodeByteToHex(iv) + '.' + encodeByteToHex(encrypted)
    })
    
    return encodeByteToHex(iv) + '.' + encodeByteToHex(encrypted)
  } catch (error) {
    console.log(error)
    throw new Error('encryption failed')
  }
}
