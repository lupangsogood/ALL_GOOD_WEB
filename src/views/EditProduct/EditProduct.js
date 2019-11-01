import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import LoadingScreen from "react-loading-screen";
import loadingImage from "../../assets/img/loading.png";
import { connect } from "react-redux";
import Action from "../../Action/action";

class EditProduct extends Component {
  state = {
    productData: "",
    editProductData: "",
    loading: false
  };
  async componentWillMount() {
    if (typeof this.props.history.location.state == "undefined") {
      this.props.history.push("list");
    } else {
      await this.setState({
        productData: this.props.history.location.state
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    let loading = this.state.loading;
    let result = nextProps.resultTask.result;
    console.log(nextProps.resultTask);

    if (result === "SUCCESS") {
      this.props.history.push("/list");
      // window.location.replace("/list");
    } else {
      if (nextProps.resultTask.loading !== loading) {
      } else {
        console.log("FAILURE");
        this.setState({
          loading: false
        });
        this.createNotification("error");
      }
    }
  }

  createNotification = type => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error(
          "กรุณาตรวจสอบข้อมูลสินค้า",
          "เกิดข้อผิดพลาด",
          5000,
          () => {}
        );
        break;
      default:
        break;
    }
  };

  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      productData: {
        ...this.state.productData,
        [name]: value
      }
    });
  };

  onHandleImageChange = e => {
    this.setState({
      productData: {
        ...this.state.productData,
        product_image_file: e.target.files[0],
        product_img_url: URL.createObjectURL(e.target.files[0])
      }
    });
  };

  onSubmit = () => {
    this.setState({
      loading: true
    });
    this.props.editProduct(this.state.productData);
  };

  render() {
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc={loadingImage}
        text="Here an introduction sentence (Optional)"
      >
        <div className="animated fadeIn">
          <NotificationContainer />

          <Row className="row justify-content-md-center">
            <Col xs="12" md="10" xl="8">
              <Card>
                <CardHeader>
                  <strong>เพิ่มสินค้า</strong>
                </CardHeader>

                <CardBody>
                  <Form className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">ชื่อสินค้า</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="text"
                          id="text-input"
                          name="product_name"
                          placeholder=""
                          value={this.state.productData.product_name}
                          onChange={e => this.onHandleChange(e)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="textarea-input">รายละเอียดสินค้า</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="textarea"
                          name="product_desc"
                          id="textarea-input"
                          rows="5"
                          value={this.state.productData.product_desc}
                          placeholder="รายละเอียดของสินค้า..."
                          onChange={e => this.onHandleChange(e)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">ราคาทุน</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="text-input"
                          name="product_price"
                          placeholder=""
                          min={0}
                          value={this.state.productData.product_price}
                          type="number"
                          onChange={e => this.onHandleChange(e)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">ราคาขาย</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="text-input"
                          name="price"
                          placeholder=""
                          type="number"
                          disabled={true}
                          value={this.state.productData.product_price}
                          onChange={e => this.onHandleChange(e)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">จำนวน</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="text-input"
                          name="product_quantity"
                          placeholder="สูงสุด 100"
                          min={0}
                          max={100}
                          type="number"
                          step="1"
                          value={this.state.productData.product_quantity}
                          onChange={e => this.onHandleChange(e)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">รูปสินค้า</Label>
                      </Col>

                      <Col xs="12" md="9">
                        <Input
                          type="file"
                          id="file-input"
                          name="product_image"
                          onChange={e => this.onHandleImageChange(e)}
                        />
                        <img
                          alt="รูปภาพสินค้า"
                          src={this.state.productData.product_img_url}
                          width="100"
                          height="100"
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    <i className="fa fa-dot-circle-o"></i> Submit
                  </Button>
                  {/* <Button
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.onReset}
                  >
                    <i className="fa fa-ban"></i> Reset
                  </Button> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </LoadingScreen>
    );
  }
}
const mapStateToProps = state => ({
  resultTask: state.ProductReducer
});

const mapDispatchToProps = dispatch => ({
  editProduct: product => dispatch(Action.editProduct(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);
