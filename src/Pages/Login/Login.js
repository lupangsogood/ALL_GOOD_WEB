import React, { Component } from "react";
import { connect } from "react-redux";
import Action from "../../Action/action";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    // this.props.testAPI();
    // console.log(this.props.testStateAPI);
  }

  loginBtn = () => {
    // console.log(this.state.username)
    // console.log(this.state.password)
    this.props.login();
    this.props.history.push("/dashboard");
  };

  inputTxtLogin = e => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.inputTxtLogin}
                          value={this.props.testStateAPI}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.inputTxtLogin}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.loginBtn}
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testStateAPI: state.ProductReducer.testFetch,
  testLogin: state.UserReducer.state
});

const mapDispatchToProps = dispatch => ({
  testAPI: () => dispatch(Action.testFetchData()),
  login: () => dispatch(Action.login())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
