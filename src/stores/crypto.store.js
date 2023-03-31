import { create } from 'zustand'
import { initKeyExchange } from '../api/crypto.api'
import { generateEcdhKeyPair, generateDeriveEcdhKey, importPemStringToKey, exportKeyToPemString } from '../lib/crypto'

const useCryptoStore = create((set) => ({
  secretKey: null,
  sessionId: null,

  fetchKeyExchange: async () => {
    const [myPrivKey, myPubKey] = await generateEcdhKeyPair()
    const myPublicKeyString = await exportKeyToPemString(myPubKey)
    console.log(myPublicKeyString)
    const { pubKey, sessionId } = await initKeyExchange({ myPubKey: myPublicKeyString })
    const peerPublicKey = await importPemStringToKey(pubKey)
    const secretKey = await generateDeriveEcdhKey({ myPrivKey, pubKey: peerPublicKey })

    set({ secretKey, sessionId })
  },
  clearKeys: () => {
    set({ secretKey: null, sessionId: null })
  },
}))

export default useCryptoStore