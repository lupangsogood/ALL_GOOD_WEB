import React, { useContext, useEffect, useState } from "react"
import Compose from "../Compose"
import Toolbar from "../Toolbar"
import ToolbarButton from "../ToolbarButton"
import Message from "../Message"
import moment from "moment"
import { db } from "../.././../firebaseConfig/firebase"

import "./MessageList.css"
import { RoomIdStoreContext } from "../chat"
const MY_USER_ID = "apple"

export default function MessageList(props) {
  const [messages, setMessages] = useState([])
  const [roomId, setRoomId] = useState({
    roomIdState: useContext(RoomIdStoreContext) ? "KDIDCjEUQaR6pdkNMrEj" : ""
  })

  // useEffect(() => {
  //   getMessageChatRoom()
  // }, [])

  // const getMessages = () => {
  //   var tempMessages = [
  //     {
  //       id: 1,
  //       author: "apple",
  //       message:
  //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 2,
  //       author: "orange",
  //       message:
  //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 3,
  //       author: "orange",
  //       message:
  //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 4,
  //       author: "apple",
  //       message:
  //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 5,
  //       author: "apple",
  //       message:
  //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 6,
  //       author: "apple",
  //       message:
  //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 7,
  //       author: "orange",
  //       message:
  //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 8,
  //       author: "orange",
  //       message:
  //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 9,
  //       author: "apple",
  //       message:
  //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
  //       timestamp: new Date().getTime()
  //     },
  //     {
  //       id: 10,
  //       author: "orange",
  //       message:
  //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
  //       timestamp: new Date().getTime()
  //     }
  //   ]
  // }

  const renderMessages = () => {
    let i = 0
    let messageCount = messages.length
    let tempMessages = []

    while (i < messageCount) {
      let previous = messages[i - 1]
      let current = messages[i]
      let next = messages[i + 1]
      let isMine = current.role === "admin"
      let currentMoment = moment(current.timestamp)
      let prevBySameAuthor = false
      let nextBySameAuthor = false
      let startsSequence = true
      let endsSequence = true
      let showTimestamp = true

      if (previous) {
        let previousMoment = moment(previous.timestamp)
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        )
        prevBySameAuthor = previous.author === current.author

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp)
        let nextDuration = moment.duration(nextMoment.diff(currentMoment))
        nextBySameAuthor = next.author === current.author

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      )
      // Proceed to the next message.
      i += 1
    }
    return tempMessages
  }

  //setModel ให้ตรงกับ FireStore ของเรา
  //เสร็จแล้วให้ ทำ Function คลิกเพื่อโหลดข้อมูล Chat ของ Collection นั้นๆ

  // อาจจะต้องใช้ context มารับส่งข้อมูล
  const getMessageChatRoom = () => {
    db.collection("chat")
      .doc(`${roomId.roomIdState}`)
      .collection("message")
      .orderBy("time")
      .onSnapshot(value => {
        console.log(value)
        var tempMessagesDocData = []
        const data = value.docs.map((doc, index) => {
          tempMessagesDocData.push({
            id: index,
            author: `${doc.data().firstname} ${doc.data().lastname}`,
            role: doc.data().role,
            message: doc.data().message,
            timestamp: new Date().getTime()
          })
          setMessages([...messages, ...tempMessagesDocData])
          console.log(tempMessagesDocData)
        })
      })
  }

  return (
    <div className="message-list">
      <Toolbar title="Conversation Title" />
      <div className="message-list-container">{renderMessages()}</div>
      <Compose />
    </div>
  )
}
