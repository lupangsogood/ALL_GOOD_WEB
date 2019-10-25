import React, { Component } from "react";
import LoadingScreen from "react-loading-screen";
import loadingImage from "../../assets/img/loading.png";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

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

import { connect } from "react-redux";
import Action from "../../Action/action";

class AddProductForms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      loading: false,
      addProductState: {
        // product_name: "",
        // product_desc: "",
        // product_price: "",
        // price: "",
        // quantity: "",
        // product_image: ""
      }
    };
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
        NotificationManager.error("Error message", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
    }
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onHandleChange = e => {
    // console.log(e.target.name);
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      addProductState: {
        ...this.state.addProductState,
        [name]: value
      }
    });
  };

  onHandleImageChange = e => {
    this.setState({
      addProductState: {
        ...this.state.addProductState,
        product_image_file: e.target.files[0]
      }
    });
  };

  onSubmit = () => {
    // console.log(this.state.addProductState);
    this.setState({
      loading: true
    });
    this.props.addProduct(this.state.addProductState);
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let loading = this.state.loading;
    let result = this.props.resultTask.result;
    if (nextProps.resultTask.loading != loading) {
      if (result == "SUCCESS") {
        this.props.history.push("/lists");
      } else {
        this.setState({
          loading: false
        });
        this.createNotification("error");
      }
    } else {
      this.setState({
        loading: false
      });
      this.createNotification("error");
    }
    // let loading = this.state.loading;
    // let resultLoding = this.props.resultTask.result;
    // if (resultLoding == loading) {
    //   console.log("UPDATED");
    //   let result = this.props.resultTask.result;

    //   if (result == "SUCCESS") {
    //     this.props.history.push("/lists");
    //   } else if (result == "FAILURE") {
    //     console.log("failed");

    //     this.setState({
    //       loading: false
    //     });
    //     this.createNotification("error");
    //   } else {
    //     console.log("failed");

    //     this.setState({
    //       loading: false
    //     });
    //     this.createNotification("error");
    //   }
    // }
  }

  onReset = () => {};
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
        <NotificationContainer />

        <div className="animated fadeIn">
          <Row className="row justify-content-md-center">
            <Col xs="12" md="10" xl="8">
              <Card>
                <CardHeader>
                  <strong>เพิ่มสินค้า</strong>
                </CardHeader>
                <CardBody>
                  <Form type="submit">
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
                          name="quantity"
                          placeholder="สูงสุด 100"
                          min={0}
                          max={100}
                          type="number"
                          step="1"
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
                  <Button
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.onReset}
                  >
                    <i className="fa fa-ban"></i> Reset
                  </Button>
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
  addProduct: product => dispatch(Action.addProduct(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductForms);
