import React from "react";
import { Figure } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { Switch, Route } from "react-router-dom";
import FollowCard from "../components/FollowCard";
import Heading from "../components/Heading";
import SearchBar from "../components/SearchBar";
import Trends from "../components/Trends";
import UserSuggestions from "../components/UserSuggestions";

export default function Explore({ noSearchBar }) {
  return (
    <>
      <div className="header">
        {!noSearchBar && (
          <MediaQuery maxWidth={1020}>
            <SearchBar className="w-100 p-2" />
          </MediaQuery>
        )}
      </div>
      <Switch>
        <Route path="/explore/users">
          <Heading title="Users" />
          <UserSuggestions length={10} noPop />
        </Route>
        <Route path="/">
          <MediaQuery maxWidth={992}>
            <FollowCard
              noPop
              title="Follow more users to see their posts"
              length={4}
            />
          </MediaQuery>
          <Heading title="Trends near you" />
          <Figure className="d-flex flex-column">
            <Figure.Image src="/img/twitter-home.png" alt="trends" />
          </Figure>
          <Trends length={6} />
        </Route>
      </Switch>
    </>
  );
}
