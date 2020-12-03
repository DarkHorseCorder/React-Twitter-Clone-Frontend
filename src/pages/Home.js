import React from "react";
import CreatePost from "components/CreatePost";
import Feed from "components/Feed";
import Heading from "components/Heading";
import MediaQuery from "react-responsive";

export default function Home() {
  return (
    <>
      <Heading title="Home" btnLogout btnProfile />
      <MediaQuery minWidth={576}>
        <CreatePost />
        <div
          style={{ height: "10px" }}
          className="w-100 bg-border-color border"
        />
      </MediaQuery>
      <Feed />
    </>
  );
}
