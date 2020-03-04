import React, { Component } from "react"
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap"
import { NotificationContainer, NotificationManager } from "react-notifications"
import { connect } from "react-redux"
import Action from "../../Action/action"

import waitingImageUrl from "../../assets/img/waiting.png"
// const imageUrl =
//   "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";

// const element = [
//   {
//     order_transfer: 1,
//     order_date: "22/10/2019",
//     order_detail: "",
//     order_total_price: "5,500",
//     order_img_url: imageUrl,
//     order_tracking: "",
//     order_status: "",
//     order_action: ""
//   },
//   {
//     order_transfer: 2,
//     order_date: "22/10/2019",
//     order_detail: "",
//     order_total_price: "3,025",
//     order_img_url: imageUrl,
//     order_tracking: "",
//     order_status: "",
//     order_action: ""
//   },
//   {
//     order_transfer: 3,
//     order_date: "22/10/2019",
//     order_detail: "",
//     order_total_price: "1,500",
//     order_img_url: imageUrl,
//     order_tracking: "",
//     order_status: "",
//     order_action: ""
//   },
//   {
//     order_transfer: 3,
//     order_date: "22/10/2019",
//     order_detail: "",
//     order_total_price: "1,500",
//     order_img_url: imageUrl,
//     order_tracking: "",
//     order_status: "",
//     order_action: ""
//   }
// ];
class OrderProductForms extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editOrder: "",
      modal: false,
      detailModal: false,
      updateModal: false,
      loading: false,
      resultTask: "",
      slipImageModal: {
        imageUrl: "",
        imageModal: false
      },
      calcelOrderData: {
        order_id: ""
      },
      detailOrder: [
        {
          product: {}
        }
      ],
      pageNumber: 1
    }
  }

  async componentWillMount() {
    console.log("Reload")
    let userData = this.props.userData
    let accesToken = await userData.token
    console.log(accesToken)
    this.props.fetchOrder(accesToken)
  }

  componentWillReceiveProps(nextProps) {
    let loading = this.state.loading
    let result = nextProps.resultTaskOrder.body
    // console.log(result);
    this.setState({
      resultTask: result,
      loading: nextProps.resultTaskOrder.loading
    })
    let userData = this.props.userData
    let accesToken = userData.token
    console.log(accesToken)

    if (this.state.resultTask === "SUCCESS") {
      console.log("TEST Receive Props")
      this.props.fetchOrder(accesToken)
      this.setState({
        modal: false,
        updateModal: false,
        resultTask: "FAILURE"
      })
    } else {
      if (this.props.resultTaskOrder.loading !== loading) {
      } else {
        console.log("FAILURE")
        this.setState({
          loading: false
        })
        // this.createNotification("error");
      }
    }
  }

  createNotification = type => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message")
        break
      case "success":
        NotificationManager.success("Success message", "Title here")
        break
      case "warning":
        NotificationManager.warning("Warning message", "กรุณากรอกข้อมูล", 3000)
        break
      case "error":
        NotificationManager.error(
          "กรุณาตรวจสอบข้อมูลสินค้า",
          "เกิดข้อผิดพลาด",
          5000,
          () => {}
        )
        break
      default:
        break
    }
  }

  setBadge = order_sts_id => {
    let orderStatus = {
      color: "",
      text: ""
    }

    switch (order_sts_id) {
      case "2":
        orderStatus = {
          color: "primary",
          text: "รอชำระเงิน"
        }
        return orderStatus

      case "3":
        orderStatus = {
          color: "warning",
          text: "รอตรวจสอบ"
        }
        return orderStatus
      case "4":
        orderStatus = {
          color: "info",
          text: "รอขนส่ง"
        }
        return orderStatus
      case "5":
        orderStatus = {
          color: "success",
          text: "สำเร็จ"
        }
        return orderStatus

      case "7":
        orderStatus = {
          color: "dark",
          text: "ยกเลิกรายการแล้ว"
        }
        return orderStatus
      default:
        return orderStatus
    }
  }

  toggle = orderData => {
    this.setState({
      modal: !this.state.modal,
      calcelOrderData: orderData
    })
  }

  toggleDetail = (orderDetail, orderUserData) => {
    this.setState({
      detailOrder: orderDetail,
      detailUser: orderUserData,
      detailModal: !this.state.detailModal
    })
  }

  toggleImage = imageUrl => {
    // console.log(imageUrl);
    this.setState({
      slipImageModal: {
        imageUrl: imageUrl,
        imageModal: !this.state.slipImageModal.imageModal
      }
    })
  }

  toggleUpdate = (orderId, trackingCode) => {
    var order_id = orderId
    var trackingCode = this.state.editOrder.ems_barcode
    if (typeof trackingCode === "undefined" || trackingCode === "") {
      console.log("เข้าไม่ได้")
      console.log(trackingCode)
    } else {
      this.setState({
        updateOrderId: orderId,
        updateModal: !this.state.updateModal
      })
    }
  }

  updateTrackingCode = trackingCode => {
    let name = trackingCode.target.name
    let value = trackingCode.target.value
    this.setState({
      editOrder: {
        ...this.state.editOrder,
        [name]: value
      }
    })

    console.log(this.state.editOrder)
  }

  editOrderData = order_id => {
    console.log(order_id)
    console.log(this.state.editOrder)

    let userData = this.props.userData
    let accesToken = userData.token
    this.props.updateOrderData(
      this.state.editOrder.ems_barcode,
      order_id,
      accesToken
    )
  }

  setTableData = pageNumber => {
    let order = this.props.orderDataFetch
    let orderData = order.order
    let orderDataSort = orderData.sort((a, b) =>
      a.order_id < b.order_id ? 1 : -1
    )
    console.log(orderDataSort)
    let orderDataSlice = orderDataSort.slice(
      (pageNumber - 1) * 20,
      pageNumber * 20
    )

    return orderDataSlice.map((element, index) => {
      let orderStatus = this.setBadge(element.order_sts_id)
      let disable = false
      let imageDisable = "false"

      if (
        element.order_sts_id === "7" ||
        element.order_sts_id === "5" ||
        element.order_sts_id === "2"
      ) {
        disable = true
        // console.log(disable);
      } else {
        disable = false
      }

      if (typeof element.order_img_url === "undefined") {
        imageDisable = "false"
      } else {
        imageDisable = "true"
      }

      if (typeof element.order_at === "undefined") {
        var order_date = ""
      } else {
        var order_date = `${element.order_at}`.substring(0, 10)
      }

      return (
        <tr key={index}>
          <td align="center">{element.order_id}</td>
          <td align="center">{order_date}</td>
          <td align="center">
            <Button
              color="info"
              onClick={() => this.toggleDetail(element.product, element.user)}
            >
              <i className="cui-monitor"></i>
            </Button>
          </td>
          <td align="center">{element.order_total_price}</td>
          <td align="center">
            <img
              src={
                element.order_img_url ? element.order_img_url : waitingImageUrl
              }
              disable={imageDisable}
              alt="รูปสินค้า"
              width="100"
              height="100"
              onClick={() => this.toggleImage(element.order_img_url)}
            />
          </td>
          <td align="center">
            <Input
              disabled={disable}
              name="ems_barcode"
              defaultValue={element.ems_barcode}
              onChange={e => this.updateTrackingCode(e)}
            />
            <Button
              disabled={disable}
              color="success"
              style={{ marginTop: "3px" }}
              // onClick={() => this.editOrderData(element.order_id)}
              onClick={() => this.toggleUpdate(element.order_id)}
            >
              <i className="cui-task" style={{ marginRight: "3px" }}></i>
              Update Tracking Code
            </Button>
          </td>
          <td align="center">
            <h4>
              <Badge color={orderStatus.color}>{orderStatus.text}</Badge>
            </h4>
          </td>
          <td align="center">
            <Button
              disabled={disable}
              color="danger"
              onClick={() => this.toggle(element)}
            >
              Cancle Order
            </Button>
          </td>
        </tr>
      )
    })
  }

  setTableDetail = (orderDetail, userData) => {
    return orderDetail.map((element, index) => {
      let amount = element.price * element.quantity
      return (
        <tr key={index}>
          <td align="center">{element.product_id}</td>
          <td align="center">{element.product_name}</td>
          <td align="center">{element.product_desc}</td>
          <td align="center">
            <img
              src={element.product_img_url}
              alt="รูปสลิปสั่งซื้อ"
              width="100"
              height="100"
            />
          </td>
          <td align="center">{element.price}</td>
          <td align="center">{element.quantity}</td>
          <td align="center">{amount}</td>
        </tr>
      )
    })
  }

  modalDetail = () => {
    let orderDetail = this.state.detailOrder
    let orderUserData = this.state.detailUser
    // console.log(orderDetail);
    // console.log(this.state.detailUser);
    if (typeof orderUserData === "undefined") {
      var userData = ""
    } else {
      var userData = orderUserData
    }
    return (
      <div>
        <Modal
          style={{ maxWidth: "90%" }}
          isOpen={this.state.detailModal}
          toggle={() => this.toggleDetail(orderDetail, orderUserData)}
        >
          <ModalHeader>
            รายละเอียดการสั่งซื้อ
            {/* <h5>{orderUserData.user_id}</h5> */}
          </ModalHeader>
          <ModalBody>
            <b>รหัสลูกค้า :</b> {userData.user_id} <b> อีเมลล์ :</b>{" "}
            {userData.user_email} <br></br>
            <b>ชื่อ :</b> {userData.user_firstname} <b>นามสกุล :</b>{" "}
            {userData.user_lastname} <br></br>
            <b>ที่อยู่ :</b> {userData.user_address} <br></br>
            <b>เบอร์โทรติดต่อ : </b>
            {userData.user_tel}
            <Table responsive striped>
              <thead>
                <tr align="center">
                  <th>รหัสสินค้า</th>
                  <th>ชื่อสินค้า</th>
                  <th>รายละเอียดสินค้า</th>
                  <th>รูปสินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>รวม</th>
                </tr>
              </thead>
              <tbody>{this.setTableDetail(orderDetail, orderUserData)}</tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            {/* ไว้ใส่ราคารวม */}
            <Button
              color="danger"
              onClick={() => this.toggleDetail(orderDetail, orderUserData)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  modalSlipImage = () => {
    const slipImageUrl = this.state.slipImageModal.imageUrl
    // console.log(slipImageUrl);
    // console.log(this.state.slipImageModal);
    return (
      <div>
        <Modal
          style={{ maxWidth: "60%" }}
          isOpen={this.state.slipImageModal.imageModal}
          toggle={this.toggleImage}
        >
          <ModalHeader>รูปภาพสลิปโอนเงิน</ModalHeader>
          <ModalBody>
            <div align="center">
              <img src={slipImageUrl} alt="รูปสลิปการชำระเงิน" />
            </div>
          </ModalBody>
          <ModalFooter>
            {/* ไว้ใส่ราคารวม */}
            <Button color="danger" onClick={this.toggleImage}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  cancleOrder = () => {
    let orderData = this.state.calcelOrderData

    let userData = this.props.userData
    let accesToken = userData.token
    this.props.cancelOrderData(orderData, accesToken)
    this.setState({
      modal: !this.state.modal
    })
  }

  ModalDelete = () => {
    let order = this.state.calcelOrderData
    // console.log(order);
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>ยกเลิกรายการ</ModalHeader>
          <ModalBody>
            ท่านต้องการจะยกเลิกรายการสั่งซื้อที่
            <strong> {order.order_id || ""} </strong> ใช่หรือไม่
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.cancleOrder()}>
              Yes
            </Button>
            <Button color="danger" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  ModalUpdateTracking = () => {
    let trackingCode = this.state.ems_barcode
    let orderId = this.state.updateOrderId

    return (
      <div>
        <Modal
          isOpen={this.state.updateModal}
          toggle={() => this.toggleUpdate(orderId, trackingCode)}
        >
          <ModalHeader>ยกเลิกรายการ</ModalHeader>
          <ModalBody>
            ท่านต้องการอัพเดทรายการสั่งซือที่
            <strong> {orderId || ""} </strong> ใช่หรือไม่
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editOrderData(orderId)}>
              Yes
            </Button>
            <Button
              color="danger"
              onClick={() => this.toggleUpdate(orderId, trackingCode)}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  setPagination = pageNumber => {
    let orderData = this.props.orderDataFetch.order
    let orderDataPagination = Array(Math.ceil(orderData.length / 20))
    return orderDataPagination.fill().map((_, index) => {
      return (
        <PaginationItem key={index + 1} active={pageNumber === index + 1}>
          <PaginationLink
            value={index + 1}
            onClick={e => {
              this.setIsActivePage(index + 1, e)
            }}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  setIsActivePage = (pageNumber, e) => {
    console.log(this.state.pageNumber, pageNumber)
    e.preventDefault()
    this.setTableData(pageNumber)
    this.setState({
      pageNumber: pageNumber
    })
  }

  render() {
    console.log("init OrderForm")
    let { pageNumber } = this.state
    let sizeOfPagination = Math.ceil(
      this.props.orderDataFetch.order.length / 20
    )
    return (
      <div className="animated fadeIn">
        <Row>
          <Col className="justify-content-end" align="right" xs="12" xl="12">
            {/* <Button
              color="warning"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              <i className="cui-cloud-download"></i>
              RELOAD
            </Button> */}
          </Col>
        </Row>
        <Row className="row justify-content-md-center ">
          <Col xs="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>รายการการสั่งซื้อ
              </CardHeader>

              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr align="center">
                      <th>Order_ID</th>
                      <th>Order_Date</th>
                      <th>Order_Detail</th>
                      <th>Order_Amount</th>
                      <th>Order_Slip</th>
                      <th>Order_Tracking</th>
                      <th>Order_Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.setTableData(this.state.pageNumber)}</tbody>
                </Table>
              </CardBody>
            </Card>
            {this.modalDetail()}
            {this.modalSlipImage()}
            {this.ModalDelete()}
            {this.ModalUpdateTracking()}
          </Col>
        </Row>
        <Pagination className="row justify-content-md-center" size="lg">
          <PaginationItem key={0} disabled={pageNumber - 1 <= 0}>
            <PaginationLink
              onClick={e => this.setIsActivePage(pageNumber - 1, e)}
              previous
            />
          </PaginationItem>
          {this.setPagination(pageNumber)}

          <PaginationItem
            key={sizeOfPagination}
            disabled={pageNumber >= sizeOfPagination}
          >
            <PaginationLink
              onClick={e => this.setIsActivePage(pageNumber + 1, e)}
              next
            />
          </PaginationItem>
        </Pagination>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderDataFetch: state.FetchOrderReducer.body.data,
  resultTaskOrder: state.EditOrderReducer,
  userData: state.UserReducer
})

const mapDispatchToProps = dispatch => ({
  fetchOrder: access_token => {
    dispatch(Action.fetchOrder(access_token))
  },

  updateOrderData: (orderData, order_id, accessToken) => {
    dispatch(Action.updateTrackCode(orderData, order_id, accessToken))
  },
  cancelOrderData: (orderData, accessToken) => {
    dispatch(Action.cancelOrder(orderData, accessToken))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductForms)
