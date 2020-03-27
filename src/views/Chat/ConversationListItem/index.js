import React, { useEffect, useState, lazy } from "react"
import shave from "shave"

import "./ConversationListItem.css"

import { ChatListStoreContext } from "../chat"

export default function ConversationListItem(props) {
  useEffect(() => {
    shave(".conversation-snippet", 20)
  })

  const { photo, name, text, roomId } = props.data

  const getRoomIdFromClick = () => {
    props.callback(roomId, photo)
  }
  return (
    <div
      className="conversation-list-item"
      onClick={() => {
        getRoomIdFromClick()
      }}
    >
      <img
        className="conversation-photo"
        width="100px"
        height="100px"
        src={photo}
        alt="conversation"
      />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  )
}
