import React, { useState, useEffect } from "react"
import ConversationSearch from "../ConversationSearch"
import ConversationListItem from "../ConversationListItem"
import Toolbar from "../Toolbar"
import axios from "axios"
import "./ConversationList.css"
import { db } from "../.././../firebaseConfig/firebase"

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    getConversations()
  }, [])

  const getConversations = () => {
    axios.get("https://randomuser.me/api/?results=20").then(response => {
      let newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text:
            "Hello world! This is a long message that needs to be truncated."
        }
      })
      setConversations([...conversations, ...newConversations])
    })
  }

  //setModel ให้ตรงกับ FireStore ของเรา
  //เสร็จแล้วให้ ทำ Function คลิกเพื่อโหลดข้อมูล Chat ของ Collection นั้นๆ

  // อาจจะต้องใช้ context มารับส่งข้อมูล
  const getChatRoom = () => {
    db.collection("chat").onSnapshot(value => {
      console.log(value)
      const data = value.docs.map(doc => doc.data())
      console.log(data)
    })
  }

  return (
    <div className="conversation-list">
      <Toolbar title="Messenger" />
      <ConversationSearch />
      {conversations.map(conversation => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))}
    </div>
  )
}
