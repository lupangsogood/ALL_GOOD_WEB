import React, { Component, lazy, Suspense } from "react";
// import { Bar, Line } from 'react-chartjs-2';

import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Action from "../../Action/action";
import { connect } from "react-redux";
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

console.log("init Dashboard");
const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const productData = [
  {
    product_id: "1",
    product_name: "บราวนี่",
    product_img_url: "https://i.ytimg.com/vi/zF0j1fGWwp0/maxresdefault.jpg",
    price: "100",
    product_price: "150",
    quantity: "10"
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      modal: false,
      product: {
        product_id: "",
        product_name: ""
      }
    };
  }

  toggle = (product_id, product_name) => {
    this.setState({
      modal: !this.state.modal,
      product: {
        product_id: product_id,
        product_name: product_name
      }
    });
  };

  componentDidMount() {
    this.props.fetchProductData();
  }

  deleteProduct = () => {
    this.setState({
      modal: !this.state.modal
    });
    // this.props.history.push("/products/lists");
  };

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  editProduct = product_id => {
    console.log(product_id);
    this.props.history.push("/products/edit");
  };

  ModalDelete = () => {
    let product_id = this.state.product.product_id;
    let product_name = this.state.product.product_name;
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>ลบสินค้า</ModalHeader>
          <ModalBody>
            ท่านต้องการจะลบ
            <strong> {product_name || ""} </strong> ใช่หรือไม่
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteProduct}>
              Delete
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  settingTable = () => {
    return productData.map(data => {
      return (
        <tr key={data.product_id}>
          <td className="text-center">{data.product_id}</td>
          <td>
            <div>{data.product_name}</div>
            <div className="small text-muted">
              <span>New</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td className="text-center">
            <img src={data.product_img_url} width="100" height="100" />
          </td>
          <td>
            <div className="text-center">{data.product_price} </div>
          </td>
          <td className="text-center">{data.price}</td>
          <td className="text-center">{data.quantity}</td>

          <td className="text-center">
            <ButtonGroup>
              <Button
                color="warning"
                onClick={() => this.editProduct(data.product_id)}
              >
                <i className="cui-wrench"></i>
              </Button>
            </ButtonGroup>
          </td>
          <td className="text-center">
            <ButtonGroup>
              <Button
                color="danger"
                onClick={() => this.toggle(data.product_id, data.product_name)}
              >
                <i className="icon-trash"></i>
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Suspense fallback={this.loading()}>
          <Row>
            <Col></Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table
                    hover
                    responsive
                    className="table-outline mb-0 d-none d-sm-table"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">Product ID</th>
                        <th className="text-center">Product Name</th>
                        <th className="text-center">Product Image</th>
                        <th className="text-center">Product Cost</th>
                        <th className="text-center">Product Price</th>
                        <th className="text-center">Product Quantity</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>{this.settingTable()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.ModalDelete()}
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProductData: () => {
    dispatch(Action.testFetchData());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
