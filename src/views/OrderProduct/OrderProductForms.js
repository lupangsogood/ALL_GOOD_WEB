import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import Action from "../../Action/action";
import { elementType } from "prop-types";
import { text } from "body-parser";
const imageUrl =
  "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";

const element = [
  {
    order_transfer: 1,
    order_date: "22/10/2019",
    order_detail: "",
    order_total_price: "5,500",
    order_img_url: imageUrl,
    order_tracking: "",
    order_status: "",
    order_action: ""
  },
  {
    order_transfer: 2,
    order_date: "22/10/2019",
    order_detail: "",
    order_total_price: "3,025",
    order_img_url: imageUrl,
    order_tracking: "",
    order_status: "",
    order_action: ""
  },
  {
    order_transfer: 3,
    order_date: "22/10/2019",
    order_detail: "",
    order_total_price: "1,500",
    order_img_url: imageUrl,
    order_tracking: "",
    order_status: "",
    order_action: ""
  }
];

class OrderProductForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOrder: ""
    };
  }

  async componentWillMount() {
    await this.props.fetchOrder();

    this.setState({
      editOrder: this.props.orderDataFetch
    });
  }

  componentDidMount() {
    // console.log(this.props.orderDataFetch);
  }

  componentWillReceiveProps(nextProps) {}

  cancleOrder = ordersId => {
    console.log(ordersId);
  };

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

      case "6":
        orderStatus = {
          color: "danger",
          text: "ยกเลิก"
        };
        return orderStatus;
      default:
        break;
    }
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
  };

  editOrderData = () => {
    // console.log(this.state);
    this.props.updateOrderData(this.state);
  };

  setTableData = order => {
    // console.log(order);
    let orderData = order.order;
    // console.log(this.state.editOrder);
    return orderData.map(element => {
      let orderStatus = this.setBadge(element.order_sts_id);
      return (
        <tr key={element.order_id}>
          <td align="center">{element.order_id}</td>
          <td align="center">2012/01/01</td>
          <td align="center">
            <Button color="info">
              <i className="cui-monitor"></i>
            </Button>
          </td>
          <td align="center">{element.order_total_price}</td>
          <td align="center">
            <img
              src={element.order_img_url}
              alt="รูปสลิปสั่งซื้อ"
              width="100"
              height="100"
            />
          </td>
          <td align="center">
            <Input
              name="ems_barcode"
              defaultValue={element.ems_barcode}
              onChange={e => this.updateTrackingCode(e)}
            />
            <Button
              color="success"
              style={{ marginTop: "3px" }}
              onClick={() => this.editOrderData()}
            >
              <i className="cui-task" style={{ marginRight: "3px" }}></i>
              Update Tracking Code
            </Button>
          </td>
          <td align="center">
            <Badge color={orderStatus.color}>{orderStatus.text}</Badge>
          </td>
          <td align="center">
            <Button
              color="danger"
              onClick={() => this.cancleOrder(element.order_id)}
            >
              Cancle Order
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    console.log("init OrderForm");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col className="justify-content-end" align="right" xs="12" xl="12">
            <Button
              color="warning"
              style={{ marginRight: "10px", marginBottom: "10px" }}
            >
              <i className="cui-cloud-download"></i>
              RELOAD
            </Button>
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
                <Pagination>
                  <PaginationItem disabled>
                    <PaginationLink previous tag="button">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderDataFetch: state.FetchOrderReducer.body.data
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: () => {
    dispatch(Action.fetchOrder());
  },
  updateOrderData: orderData => {
    dispatch(Action.updateTrackCode(orderData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderProductForms);
