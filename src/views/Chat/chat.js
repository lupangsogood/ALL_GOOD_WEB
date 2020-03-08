import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MessageList from "./MessageList"
import ConersationList from "./ConversationList"
import "./Messenger/Messenger.css"

// import { firebase, db } from "../../firebaseConfig/firebase"

class ChatList extends Component {
  componentWillMount() {
    this.fetctChatRoomRealtime()
  }

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

  render() {
    return (
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
    )
  }
}
export default ChatList
