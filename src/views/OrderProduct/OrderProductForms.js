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
const imageUrl =
  "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";

const element = [
  {
    order_id: 1,
    order_date: "22/10/2019",
    order_detail: "",
    order_amount: "5,500",
    order_slip: imageUrl,
    order_tracking: "",
    order_status: "",
    order_action: ""
  },
  {
    order_id: 2,
    order_date: "22/10/2019",
    order_detail: "",
    order_amount: "3,025",
    order_slip: imageUrl,
    order_tracking: "",
    order_status: "",
    order_action: ""
  },
  {
    order_id: 3,
    order_date: "22/10/2019",
    order_detail: "",
    order_amount: "1,500",
    order_slip: imageUrl,
    order_tracking: "",
    order_status: "",
    order_action: ""
  }
];

class OrderProductForms extends Component {
  async componentWillMount() {
    await this.props.fetchOrder();
  }
  cancleOrder = ordersId => {
    console.log(ordersId);
  };

  setTableData = () => {
    return element.map(element => {
      return (
        <tr key={element.order_id}>
          <td align="center">{element.order_id}</td>
          <td align="center">2012/01/01</td>
          <td align="center">
            <Button color="info">
              <i className="cui-monitor"></i>
            </Button>
          </td>
          <td align="center">{element.order_amount}</td>
          <td align="center">
            <img
              src={element.order_slip}
              alt="รูปสลิปสั่งซื้อ"
              width="100"
              height="100"
            />
          </td>
          <td align="center">
            <Input>waiting</Input>
          </td>
          <td align="center">
            <Badge color="warning">waiting</Badge>
          </td>
          <td align="center">
            <Button
              color="danger"
              onClick={() => this.cancleOrder(element.key)}
            >
              Cancle Order
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    let tableTest = this.setTableData();
    console.log("init OrderForm");
    return (
      <div className="animated fadeIn">
        <Row>
          <Col className="justify-content-end" align="right" xs="12" xl="12">
            <Button color="warning" style={{ marginRight: "10px" }}>
              <i className="cui-cloud-download"></i>
              RELOAD
            </Button>
            <Button color="success">
              <i className="cui-task"></i>
              CONFIRM SHIPMENT
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
                  <tbody>{tableTest}</tbody>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchOrder: () => dispatch(Action.fetchOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderProductForms);
