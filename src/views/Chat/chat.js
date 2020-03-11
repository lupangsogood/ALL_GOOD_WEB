import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import MessageList from "./MessageList"
import ConersationList from "./ConversationList"
import "./Messenger/Messenger.css"
import { firebase, db } from "../../firebaseConfig/firebase"
export const RoomIdStoreContext = React.createContext()
export const ChatListStoreContext = React.createContext()

export default function ChatList(props) {
  const [roomIdStore, setRoomIdStore] = useState()

  const RoomIdStoreProvider = ({ children }) => {
    const store = {
      roomId: roomIdStore
    }
    return (
      <RoomIdStoreContext.Provider value={store}>
        {children}
      </RoomIdStoreContext.Provider>
    )
  }

  const getDataOnce = () => {
    let getLastRoomId = db
      .collection("chat")
      .orderBy("time", "desc")
      .limit(1)
      .get()
      .then(doc => {
        const data = doc.docs.map(doc => {
          getRoomId(doc.id)
        })
        // getRoomId(data.id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDataOnce()
  }, [])

  const getRoomId = roomId => {
    console.log("CHECK" + roomId)
    setRoomIdStore(roomId)
  }

  //ทำ callBack ให้ตอนกดเลือก Chat
  //แล้วส่ง RoomId กลับมา เพื่อไปใช้ในหน้า MessageItem
  return (
    <Row className="row justify-content-md-center messenger">
      <Col xs="12" md="5" xl="3">
        <Container className="scrollable">
          <ConersationList callBackRoomId={getRoomId} />
        </Container>
      </Col>
      <Col xs="3" md="7" xl="7">
        <Container className="scrollable">
          <RoomIdStoreProvider>
            <MessageList />
          </RoomIdStoreProvider>
        </Container>
      </Col>
    </Row>
  )
}
