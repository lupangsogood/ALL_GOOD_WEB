import React, { useContext, useState, useEffect } from "react"
import ConversationSearch from "../ConversationSearch"
import ConversationListItem from "../ConversationListItem"
import Toolbar from "../Toolbar"
import axios from "axios"
import "./ConversationList.css"
import { db } from "../.././../firebaseConfig/firebase"
import { ChatListStoreContext } from "../chat"

export default function ConversationList(props) {
  // const [conversations, setConversations] = useState([])
  const [chatListStore, setChatListStore] = useState([])

  // useEffect(() => {
  //   getConversations()
  // }, [])

  useEffect(() => {
    fetctChatRoomRealtime()
  }, [])

  const ChatListProvider = ({ children }) => {
    const store = {
      chatList: chatListStore
    }
    return (
      <ChatListStoreContext.Provider value={store}>
        {children}
      </ChatListStoreContext.Provider>
    )
  }

  // Listener Realtime Update
  const fetctChatRoomRealtime = () => {
    db.collection("chat")
      .orderBy("time", "desc")
      .onSnapshot(value => {
        console.log(value)
        const newConversation = value.docs.map(doc => {
          console.log(doc.id)
          if (
            doc.data().firstname === "" ||
            typeof doc.data().firstname === "undefined"
          ) {
          } else {
            return {
              photo: doc.data().image,
              name: `${doc.data().firstname} ${doc.data().lastname}`,
              text: doc.data().message,
              roomId: doc.id
            }
          }
        })

        setChatListStore([
          ...chatListStore,
          ...newConversation.filter(element => {
            return typeof element === "object"
          })
        ])
      })
  }

  const getRoomIdFromChatItem = (roomId, photo) => {
    props.callBackRoomId(roomId, photo)
  }
  return (
    <div className="conversation-list">
      <Toolbar title="Messenger" />
      <ConversationSearch />
      {chatListStore.map(conversation => (
        <ConversationListItem
          key={conversation.name}
          data={conversation}
          callback={getRoomIdFromChatItem}
        />
      ))}
    </div>
  )
}
