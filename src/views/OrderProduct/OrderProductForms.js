import React, { Component } from "react";
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
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import Action from "../../Action/action";

import waitingImageUrl from "../../assets/img/waiting.png";
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
    super(props);
    this.state = {
      editOrder: "",
      modal: false,
      detailModal: false,
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
      ]
    };
  }

  componentWillMount() {
    let userData = this.props.userData;
    let accesToken = userData.token;
    this.props.fetchOrder(accesToken);
  }

  // async componentDidMount() {
  //   await this.props.fetchOrder();

  //   this.setState({
  //     editOrder: this.props.orderDataFetch
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    let loading = this.state.loading;
    let result = nextProps.resultTaskOrder.body;
    // console.log(result);
    this.setState({
      resultTask: result,
      loading: nextProps.resultTaskOrder.loading
    });

    if (this.state.resultTask === "SUCCESS") {
      // console.log("TEST Receive Props");

      this.props.fetchOrder();
      this.setState({
        // modal: !this.state.modal,
        resultTask: "FAILURE"
      });
    } else {
      if (this.props.resultTaskOrder.loading !== loading) {
      } else {
        console.log("FAILURE");
        this.setState({
          loading: false
        });
        // this.createNotification("error");
      }
    }
  }

  setBadge = order_sts_id => {
    let orderStatus = {
      color: "",
      text: ""
    };

    switch (order_sts_id) {
      case "2":
        orderStatus = {
          color: "primary",
          text: "รอชำระเงิน"
        };
        return orderStatus;

      case "3":
        orderStatus = {
          color: "warning",
          text: "รอตรวจสอบ"
        };
        return orderStatus;
      case "4":
        orderStatus = {
          color: "info",
          text: "รอขนส่ง"
        };
        return orderStatus;
      case "5":
        orderStatus = {
          color: "success",
          text: "สำเร็จ"
        };
        return orderStatus;

      case "7":
        orderStatus = {
          color: "dark",
          text: "ยกเลิกรายการแล้ว"
        };
        return orderStatus;
      default:
        return orderStatus;
    }
  };

  toggle = orderData => {
    this.setState({
      modal: !this.state.modal,
      calcelOrderData: orderData
    });
  };

  toggleDetail = orderDetail => {
    this.setState({
      detailOrder: orderDetail,
      detailModal: !this.state.detailModal
    });
  };

  toggleImage = imageUrl => {
    // console.log(imageUrl);
    this.setState({
      slipImageModal: {
        imageUrl: imageUrl,
        imageModal: !this.state.slipImageModal.imageModal
      }
    });
  };

  updateTrackingCode = trackingCode => {
    let name = trackingCode.target.name;
    let value = trackingCode.target.value;
    this.setState({
      editOrder: {
        ...this.state.editOrder,
        [name]: value
      }
    });

    console.log(this.state.editOrder);
  };

  editOrderData = order_id => {
    console.log(order_id);
    console.log(this.state.editOrder);

    let userData = this.props.userData;
    let accesToken = userData.token;
    this.props.updateOrderData(
      this.state.editOrder.ems_barcode,
      order_id,
      accesToken
    );
  };

  setTableData = order => {
    console.log(order);
    let orderData = order.order;

    return orderData.map((element, index) => {
      let orderStatus = this.setBadge(element.order_sts_id);
      let disable = false;
      let imageDisable = "false";

      if (element.order_sts_id === "7") {
        disable = true;
        console.log(disable);
      } else {
        disable = false;
      }

      if (typeof element.order_img_url === "undefined") {
        imageDisable = "false";
      } else {
        imageDisable = "true";
      }
      return (
        <tr key={index}>
          <td align="center">{element.order_id}</td>
          <td align="center">2012/01/01</td>
          <td align="center">
            <Button
              color="info"
              onClick={() => this.toggleDetail(element.product)}
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
              onClick={() => this.editOrderData(element.order_id)}
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
      );
    });
  };

  setTableDetail = orderDetail => {
    // let orderDetailData = orderDetail;
    // console.log(orderDetailData);
    return orderDetail.map((element, index) => {
      let amount = element.price * element.quantity;
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
      );
    });
  };

  modalDetail = () => {
    // let orderDetail = this.state.detailOrder;
    // console.log(orderDetail);
    return (
      <div>
        <Modal
          style={{ maxWidth: "90%" }}
          isOpen={this.state.detailModal}
          toggle={this.toggleDetail}
        >
          <ModalHeader>รายละเอียดการสั่งซื้อ</ModalHeader>
          <ModalBody>
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
              <tbody>{this.setTableDetail(this.state.detailOrder)}</tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            {/* ไว้ใส่ราคารวม */}
            <Button
              color="danger"
              onClick={() => this.toggleDetail(this.state.detailOrder)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  modalSlipImage = () => {
    const slipImageUrl = this.state.slipImageModal.imageUrl;
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
    );
  };

  cancleOrder = () => {
    let orderData = this.state.calcelOrderData;

    let userData = this.props.userData;
    let accesToken = userData.token;
    this.props.cancelOrderData(orderData, accesToken);
    this.setState({
      modal: !this.state.modal
    });
  };

  ModalDelete = () => {
    let order = this.state.calcelOrderData;
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
              Cancel Order
            </Button>
            <Button color="danger" onClick={this.toggle}>
              Nope
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  render() {
    console.log("init OrderForm");
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
                  <tbody>{this.setTableData(this.props.orderDataFetch)}</tbody>
                </Table>
              </CardBody>
            </Card>
            {this.modalDetail()}
            {this.modalSlipImage()}
            {this.ModalDelete()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderDataFetch: state.FetchOrderReducer.body.data,
  resultTaskOrder: state.EditOrderReducer,
  userData: state.UserReducer
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: access_token => {
    dispatch(Action.fetchOrder(access_token));
  },

  updateOrderData: (orderData, order_id, accessToken) => {
    dispatch(Action.updateTrackCode(orderData, order_id, accessToken));
  },
  cancelOrderData: (orderData, accessToken) => {
    dispatch(Action.cancelOrder(orderData, accessToken));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderProductForms);
