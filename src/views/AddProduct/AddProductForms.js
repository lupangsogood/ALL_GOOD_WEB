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

class AddProductForms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
      // addProductState: {
      //   product_name: "",
      //   product_desc: "",
      //   product_price: "",
      //   price: "",
      //   quantity: "",
      //   product_image: ""
      // }
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onHandleChange = e => {
    console.log(e.target.name);
    let name = e.target.name;
    this.setState({
      ...this.state.addProductState,

      [name]: e.target.value
    });
    console.log(this.state);
  };

  onSubmit = values => {
    console.log(values);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="row justify-content-md-center">
          <Col xs="12" md="10" xl="8">
            <Card>
              <CardHeader>
                <strong>เพิ่มสินค้า</strong>
              </CardHeader>
              <CardBody>
                <Form>
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
                        onChange={e => this.onHandleChange(e)}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button type="reset" size="sm" color="danger">
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

export default AddProductForms;
