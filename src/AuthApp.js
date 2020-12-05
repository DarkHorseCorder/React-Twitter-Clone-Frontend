import Header from "components/Header";
import Nav from "components/BottomNav";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import Routes from "./Routes";

export default function AuthApp() {
  return (
    <Container className="mb-5 mb-sm-1">
      <Row>
        <MediaQuery minWidth={576}>
          <Col
            sm="1"
            xl="2"
            className="d-flex flex-column align-items-end p-0 sticky-top vh-100"
          >
            <Header />
          </Col>
        </MediaQuery>
        <Col sm="11" xl="10">
          <Routes />
        </Col>
      </Row>
      <MediaQuery maxWidth={576}>
        <Nav />
      </MediaQuery>
    </Container>
  );
}
