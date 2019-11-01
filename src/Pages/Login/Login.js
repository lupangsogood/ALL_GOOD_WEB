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
    loginData: {
      username: "",
      password: ""
    }
  };

  componentDidMount() {
    // this.props.testAPI();
    // console.log(this.props.testLogin);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.loginResult);
    console.log(nextProps);
    let loginResult = nextProps.loginResult;

    if (loginResult.loggedIn === false) {
    } else {
      this.props.history.push("/product/list");
    }
  }

  loginBtn = () => {
    // console.log(this.state.username)
    // console.log(this.state.password)
    this.props.login(this.state.loginData);
  };

  inputTxtLogin = e => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      loginData: {
        ...this.state.loginData,
        [name]: value
      }
    });
    console.log(this.state.loginData);
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
                          onChange={e => this.inputTxtLogin(e)}
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
                          onChange={e => this.inputTxtLogin(e)}
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
  testStateAPI: state.ProductReducer,
  loginResult: state.UserReducer
});

const mapDispatchToProps = dispatch => ({
  testAPI: () => dispatch(Action.testFetchData()),
  login: loginData => dispatch(Action.login(loginData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
