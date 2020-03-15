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

  // const getConversations = () => {
  //   axios.get("https://randomuser.me/api/?results=20").then(response => {
  //     let newConversations = response.data.results.map(result => {
  //       return {
  //         photo: result.picture.large,
  //         name: `${result.name.first} ${result.name.last}`,
  //         text:
  //           "Hello world! This is a long message that needs to be truncated."
  //       }
  //     })
  //     setConversations([...conversations, ...newConversations])
  //   })
  // }

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

  //setModel ให้ตรงกับ FireStore ของเรา
  //เสร็จแล้วให้ ทำ Function คลิกเพื่อโหลดข้อมูล Chat ของ Collection นั้นๆ

  // อาจจะต้องใช้ context มารับส่งข้อมูล
  // const getChatRoom = () => {
  //   db.collection("chat").onSnapshot(value => {
  //     console.log(value)
  //     const data = value.docs.map(doc => doc.data())
  //     console.log(data)
  //     //เช็ค RoomId ก่อนด้วย แล้วส่งเข้าไปใน newConversation

  //     // เช็คก่อนว่าเป็น array มั้ย
  //     // เช็ค Array ว่าเรียงจากอะไร
  //     let newConversations = data
  //     setConversations([...conversations, ...newConversations])
  //   })
  // }

  const getRoomIdFromChatItem = roomId => {
    props.callBackRoomId(roomId)
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
