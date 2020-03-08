import React, { Component, Suspense } from "react"
import { Container, Row, Col } from "reactstrap"

import MessageList from "./MessageList"
import ConersationList from "./ConversationList"

import "./Messenger/Messenger.css"

class ChatList extends Component {
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
