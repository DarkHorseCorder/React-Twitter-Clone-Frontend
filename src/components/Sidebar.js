import SearchBar from "components/SearchBar";
import React from "react";
import { Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FollowCard from "./FollowCard";
import TrendingCard from "./TrendingCard";

export default function Sidebar() {
  const location = useLocation();

  return (
    <Col>
      <SearchBar className="sticky-top my-2" />
      {location.pathname !== "/explore/users" && (
        <FollowCard compact className="my-3" length={5} title="Who to follow" />
      )}
      {location.pathname !== "/explore" && (
        <TrendingCard className="my-3" title="Trends for you" />
      )}
    </Col>
  );
}
