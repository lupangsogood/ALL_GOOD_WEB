import React, { useState } from "react"
import "./Compose.css"
import { db } from "../.././../firebaseConfig/firebase"

export default function Compose(props) {
  const [input, setInput] = useState()
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      let message = e.target.value
      props.addMessage(message)
      setInput("")
    }
  }

  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <div className="compose">
      <input
        value={input}
        type="text"
        className="compose-input"
        placeholder=" Type a message, @name"
        onChange={e => handleChange(e)}
        onKeyPress={e => handleKeyPress(e)}
      />
    </div>
  )
}
