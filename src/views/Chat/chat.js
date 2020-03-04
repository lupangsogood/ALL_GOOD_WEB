import React, { Component, Suspense } from "react"
import MessengerCustomerChat from "react-messenger-customer-chat"

class ChatList extends Component {
  render() {
    return (
      <div>
        <MessengerCustomerChat pageId="<YOUR_PAGE_ID>" appId="<YOUR_APP_ID>" />
      </div>
    )
  }
}
export default ChatList
