import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import Action, { editProduct } from "../../Action/action";

class EditProduct extends Component {
  state = {
    productData: "",
    editProductData: ""
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

  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      productData: {
        ...this.state.productData,
        [name]: value
      }
    });
    console.log(this.state.productData);
  };

  render() {
    return (
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
                        name="quantity"
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
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);
