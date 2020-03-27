import React from "react"
import moment from "moment"
import "./Message.css"

export default function Message(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    photo
  } = props

  const friendlyTimestamp = moment(data.timestamp).format("LLLL")
  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`
      ].join(" ")}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      <div className="bubble-container">
        {isMine ? (
          ""
        ) : (
          <img className="conversation-photo" src={photo} alt="conversation" />
        )}
        <div className="bubble" title={friendlyTimestamp}>
          {data.message}
        </div>
      </div>
    </div>
  )
}
