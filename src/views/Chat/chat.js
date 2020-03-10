import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import MessageList from "./MessageList"
import ConersationList from "./ConversationList"
import "./Messenger/Messenger.css"
// import { firebase, db } from "../../firebaseConfig/firebase"
export const RoomIdStoreContext = React.createContext()

export default function ChatList() {
  const [roomIdStore, setRoomIdStore] = useState([
    {
      roomId: "testRoomIdStore"
    }
  ])

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

  const RoomIdStoreConsumer = ({ children }) => {
    return (
      <RoomIdStoreContext.Consumer>
        {value => children(value)}
      </RoomIdStoreContext.Consumer>
    )
  }

  // this.fetctChatRoomRealtime()

  //GetDataOnce
  // fetctChatRoom = () => {
  //   db.collection("chat")
  //     .get()
  //     .then(value => {
  //       const data = value.docs.map(doc => doc.data())
  //       console.log(data)
  //     })
  // }

  //Listener Realtime Update
  // fetctChatRoomRealtime() {
  //   db.collection("chat").onSnapshot(value => {
  //     console.log(value)
  //     const data = value.docs.map(doc => doc.data())
  //     console.log(data)
  //   })
  // }

  return (
    <RoomIdStoreProvider>
      <Row className="row justify-content-md-center messenger">
        <Col xs="12" md="5" xl="3">
          <Container className="scrollable">
            <ConersationList />
          </Container>
        </Col>
        <Col xs="3" md="7" xl="7">
          <Container className="scrollable">
            <MessageList />
          </Container>
        </Col>
      </Row>
    </RoomIdStoreProvider>
  )
}
