import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import SearchBar from "components/SearchBar";
import { Link } from "react-router-dom";
import { Navbar as Nav, Row, Container } from "react-bootstrap";

export default function Navbar() {
  return (
    <Nav
      bg="white"
      sticky="top"
      className="py-1 border"
      style={{ zIndex: 10000 }}
    >
      <Container>
        <Nav.Brand
          as={Link}
          className="btn btn-naked-primary rounded-circle text-primary"
          to="/"
        >
          <FontAwesomeIcon size="lg" icon={faTwitter} />
        </Nav.Brand>
        <SearchBar />
        <Row className="ml-auto d-none d-lg-flex justify-content-end w-50">
          <Link
            to="/login"
            className="btn btn-outline-primary rounded-pill px-3 py-2 font-weight-bold"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="btn btn-primary rounded-pill px-3 py-2 font-weight-bold ml-2"
          >
            Sign up
          </Link>
        </Row>
      </Container>
    </Nav>
  );
}
