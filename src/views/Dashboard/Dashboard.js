import React, { Component, Suspense } from "react";
// import { Bar, Line } from 'react-chartjs-2';

import {
  // Badge,
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
// import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
// import returnStoreAndPersistor from "../../store";

console.log("init Dashboard");

// Main Chart

//Random Numbers
// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const productData = [
//   {
//     product_id: "1",
//     product_name: "บราวนี่",
//     product_img_url: "https://i.ytimg.com/vi/zF0j1fGWwp0/maxresdefault.jpg",
//     price: "100",
//     product_price: "150",
//     quantity: "10"
//   }
// ];

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

  async componentWillMount() {
    await this.props.fetchProductData();
  }
  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextProps);
    // let productData = nextProps.ProductReducer;
    // console.log(productData);
    // this.settingTable(productData);
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.productDataFetch);
    // let productData = this.props.productDataFetch.product;
    // console.log(productData);
    // console.log(prevProps);
    // const { store } = returnStoreAndPersistor();
    // console.log(store.getState());
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

  editProduct = product => {
    // console.log(product);
    this.props.history.push({
      pathname: "/products/edit",
      search: "?product_id=" + product.product_id,
      state: product
    });
    // this.props.history.push("/products/edit", { product_id: "1" });
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

  settingTable = productData => {
    // console.log(productData.body.data.product);
    let dumpData = productData.body.data.product;
    return dumpData.map(data => {
      return (
        <tr key={data.product_id}>
          <td className="text-center">{data.product_id}</td>
          <td>
            <div>{data.product_name}</div>
            <div className="small text-muted">
              <span>รายละเอียด</span> | {data.product_desc}
            </div>
          </td>
          <td className="text-center">
            <img
              src={data.product_img_url}
              alt="รูปภาพสินค้า"
              width="100"
              height="100"
            />
          </td>
          <td>
            <div className="text-center">{data.product_price} </div>
          </td>
          <td className="text-center">{data.product_price}</td>
          <td className="text-center">{data.product_quantity}</td>

          <td className="text-center">
            <ButtonGroup>
              <Button color="warning" onClick={() => this.editProduct(data)}>
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
                    <tbody>
                      {this.settingTable(this.props.productDataFetch)}
                    </tbody>
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

const mapStateToProps = state => ({
  productDataFetch: state.FetchProductReducer
});

const mapDispatchToProps = dispatch => ({
  fetchProductData: () => {
    dispatch(Action.fetchProduct());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
