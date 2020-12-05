import CreatePostModal from "pages/CreatePostModal";
import Explore from "pages/Explore";
import Notifications from "pages/Notifications";
import PostDetail from "pages/PostDetail";
import PostLikes from "pages/PostLikes";
import PostReposts from "pages/PostReposts";
import SearchResults from "pages/SearchResults";
import UserDetail from "pages/UserDetail";
import UserFollowers from "pages/UserFollowers";
import UserFriends from "pages/UserFriends";
import Home from "pages/Home";
import ProfileModal from "pages/ProfileModal";
import React from "react";
import { Col, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import Sidebar from "components/Sidebar";
import { Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Row>
      <Col className="px-sm-4" sm="12" lg="8">
        <Col className="border">
          <Switch>
            <Route path="/explore" component={Explore} />
            <Route path="/search" component={SearchResults} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/post/:postId/likes" component={PostLikes} />
            <Route path="/post/:postId/reposts" component={PostReposts} />
            <Route path="/post/:postId" component={PostDetail} />
            <Route path="/user/:username/friends" component={UserFriends} />
            <Route path="/user/:username/followers" component={UserFollowers} />
            <Route path="/user/:username" component={UserDetail} />
            <Route path="/settings/profile" component={ProfileModal} />
            <Route path="/" component={Home} />
          </Switch>
          <Route path="/compose/post" component={CreatePostModal} />
        </Col>
      </Col>

      <MediaQuery minWidth={992}>
        <Col lg="4" className="vh-100 overflow-y-auto hide-scroll sticky-top">
          <Sidebar />
        </Col>
      </MediaQuery>
    </Row>
  );
}
