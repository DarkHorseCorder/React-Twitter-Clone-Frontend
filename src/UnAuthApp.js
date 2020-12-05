import Navbar from "components/Navbar";
import Explore from "pages/Explore";
import Login from "pages/Login";
import PostDetail from "pages/PostDetail";
import SearchResults from "pages/SearchResults";
import Signup from "pages/Signup";
import UserDetail from "pages/UserDetail";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function UnAuthApp() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Row>
          <Col xs="12" lg="7">
            <Switch>
              <Route path="/signup">
                <MediaQuery maxWidth={992}>
                  <Signup />
                </MediaQuery>
                <MediaQuery minWidth={993}>
                  <Explore noSearchBar />
                </MediaQuery>
              </Route>
              <Route path="/search" component={SearchResults} />
              <Route path="/post/:postId" component={PostDetail} />
              <Route path="/user/:username" component={UserDetail} />
              <Route path="/">
                <MediaQuery maxWidth={992}>
                  <Login />
                </MediaQuery>
                <MediaQuery minWidth={993}>
                  <Explore noSearchBar />
                </MediaQuery>
              </Route>
            </Switch>
          </Col>
          <MediaQuery minWidth={993}>
            <Col
              className="mx-auto vh-100 sticky-top overflow-y-auto hide-scroll"
              xs
              lg="5"
            >
              <Switch>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </Col>
          </MediaQuery>
        </Row>
      </Container>
    </Router>
  );
}
