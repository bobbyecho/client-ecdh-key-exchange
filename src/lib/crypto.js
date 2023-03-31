import {  decodeHexToBytes, encodeByteToHex } from '../utils';

export async function generateEcdhKeyPair() {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256'
    },
    false,
    ['deriveKey']
  )

  return [key.privateKey, key.publicKey]
}

export function generateDeriveEcdhKey({
  myPrivKey = null,
  pubKey = null
}) {
  return window.crypto.subtle.deriveKey(
    {
      name: 'ECDH',
      public: pubKey
    },
    myPrivKey,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  )
}


export async function exportKeyToPemString(key) {
  const exportedKey = await window.crypto.subtle.exportKey('raw', key)
  const exportedKeyBuffer = new Uint8Array(exportedKey)
  return encodeByteToHex(exportedKeyBuffer)
}

export async function importPemStringToKey(pubKeyHexString) {
  const key = decodeHexToBytes(pubKeyHexString)

    return window.crypto.subtle.importKey(
    "raw",
    key,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    false,
    []
  );
}

/**
 * Approach with format SPKI
 */
// export async function exportKeyToPemString(key) {
//   const exportedKey = await window.crypto.subtle.exportKey('spki', key)
//   const exporetKeyAsString = ab2str(exportedKey)
//   const exportedAsBase64 = btoa(exporetKeyAsString)
//   return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----\n`
// }

// export async function importPemStringToKey(pemString) {
//   const pemHeader = "-----BEGIN PUBLIC KEY-----";
//   const pemFooter = "-----END PUBLIC KEY-----";
//   const pemContents = pemString.substring(
//     pemHeader.length,
//     pemString.length - pemFooter.length - 1
//   );
//   // base64 decode the string to get the binary data
//   const binaryDerString = atob(pemContents)
//   // convert from a binary string to an ArrayBuffer
//   const binaryDer = str2ab(binaryDerString);

//   return window.crypto.subtle.importKey(
//     "spki",
//     binaryDer,
//     {
//       name: "ECDH",
//       namedCurve: "P-256",
//     },
//     false,
//     []
//   );
// }