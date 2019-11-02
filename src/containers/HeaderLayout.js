import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../src/assets/img/logo2.jpg";
import dog from "../../src/assets/img/test.jpg";
import { connect } from "react-redux";
import Action from "../Action/action";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  userLogout = e => {
    this.props.logout();
    this.props.onLogout(e);
  };
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 30, alt: "Logo" }}
          minimized={{ src: logo, width: 30, height: 30, alt: "Logo" }}
        />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">
              <strong>Dashboard</strong>
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-bell"></i>
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem> */}

          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={dog}
                className="img-avatar"
                alt="admin@allgoodbrownie.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-wrench"></i> Settings
              </DropdownItem>
              <DropdownItem onClick={e => this.userLogout(e)}>
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Action.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(DefaultHeader);
