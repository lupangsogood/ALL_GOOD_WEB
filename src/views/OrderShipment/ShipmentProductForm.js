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

const element = [
  {
    key: 1,
    name: "Test"
  },
  {
    key: 2,
    name: "Test1"
  },
  {
    key: 3,
    name: "Test2"
  }
];

class ShipmentProductForms extends Component {
  setTableData = () => {
    return element.map(element => {
      return (
        <tr key={element.key}>
          <td>{element.key}</td>
          <td>
            <Input></Input>
          </td>
          <td>{element.name}</td>
          <td>
            <Badge color="success">Active</Badge>
          </td>
          <td>
            <Button color="danger">Wating</Button>
          </td>
        </tr>
      );
    });
  };
  render() {
    let tableTest = this.setTableData();
    return (
      <div className="animated fadeIn">
        <Row className="row justify-content-md-center ">
          <Col xs="12" lg="11" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>รายการจัดส่งสินค้า
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Date registered</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Paid</th>
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

export default ShipmentProductForms;
