import './App.css'
import { useState, useRef } from 'react'
import useCryptoStore from './stores/crypto.store'
import { getRandomSentenceAPI } from './api/random-secret.api'
import { sendSomethingAPI } from './api/send-something.api'

function App() {
  const cryptoState = useCryptoStore()

  const [keyPair, setKeyPair] = useState([])
  const inputRef = useRef()
  const [sentence, setSentence] = useState(null)

  const sendStrings = () => {
    sendSomethingAPI({ 
      secret: cryptoState.secretKey, 
      payload: inputRef.current.value,
      sessionId: cryptoState.sessionId
    }).then(({ status }) => {
      setKeyPair([...keyPair, {
        key: inputRef.current.value,
        value: status
      }])

      inputRef.current.value = ""
    })
  }

  const exchange = async () => {
    await cryptoState.fetchKeyExchange()
  }

  const getRandomSentence = () => {
    getRandomSentenceAPI({ secret: cryptoState.secretKey, sessionId: cryptoState.sessionId }).then((res) => {
      if (res) {
        console.log(res.sentence)
        setSentence(res.sentence)
      }
    })
  }

  return (
    <div className="App">
      <h2>Key Exchange</h2>
      <div className="card">
        <p>
          sessionID: {cryptoState.sessionId || 'null'}
        </p>
        <button className='button' onClick={() => exchange()}>
          exchange
        </button>
      </div>

      <h2>Fetch Random Words</h2>
      <div className="card">
        <p>
          {sentence || 'result random words here'}
        </p>
        <button className='button' onClick={getRandomSentence}>
          fetch
        </button>
      </div>

      <h2>Send Something</h2>
      <div className="card row">
        <div>
          <input ref={inputRef} type="text" className="textinput" />
        </div>
        {keyPair.map(({key, value}) => (
          <p key={key}>{key}: {value.toString()}</p>
        ))}
        <div style={{ marginTop: "1.5em" }}>
          <button className='button' onClick={sendStrings}>
            send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
