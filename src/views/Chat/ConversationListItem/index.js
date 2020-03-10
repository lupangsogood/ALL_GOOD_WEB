import React, { useEffect, useState, lazy } from "react"
import shave from "shave"

import "./ConversationListItem.css"

import { RoomIdStoreContext } from "../chat"

export default function ConversationListItem(props) {
  useEffect(() => {
    shave(".conversation-snippet", 20)
  })

  const { photo, name, text } = props.data

  return (
    <RoomIdStoreContext.Consumer>
      {store => {
        console.log("TEST CONSUMER = " + store)
        return (
          <div className="conversation-list-item">
            <img
              className="conversation-photo"
              src={photo}
              alt="conversation"
            />
            <div className="conversation-info">
              <h1 className="conversation-title">{name}</h1>
              <p className="conversation-snippet">{text}</p>
            </div>
          </div>
        )
      }}
    </RoomIdStoreContext.Consumer>
  )
}
