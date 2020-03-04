import React from "react"

const ListProduct = React.lazy(() => import("../src/views/Dashboard"))
const AddProduct = React.lazy(() =>
  import("../src/views/AddProduct/AddProductForms")
)

const EditProduct = React.lazy(() =>
  import("../src/views/EditProduct/EditProduct")
)
const OrderProduct = React.lazy(() =>
  import("../src/views/OrderProduct/OrderProductForms")
)
const ShipmentProducts = React.lazy(() =>
  import("../src/views/OrderShipment/ShipmentProductForm.js")
)

const ChatList = React.lazy(() => import("../src/views/Chat/chat"))

const routes = [
  { path: "/products/list", name: "ListProduct", component: ListProduct },
  { path: "/products/add", name: "AddProduct", component: AddProduct },
  { path: "/products/edit", name: "EditProduct", component: EditProduct },

  { path: "/order/list", name: "OrderProduct", component: OrderProduct },
  { path: "/order/detal/list", name: "OrderDetail;", component: {} },
  { path: "/order/track", name: "OrderTrack", component: ShipmentProducts },
  { path: "/chat", name: "Chat", component: ChatList }
]

export default routes
