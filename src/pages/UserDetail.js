import { faCalendarAlt as faDate } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faLocationArrow as faLocation } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FollowButton from "components/FollowButton";
import Heading from "components/Heading";
import PostsList from "components/PostsList";
import WithUrls from "components/WithUrls";
import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthUser } from "../context/auth-context";
import { getUserTimeline } from "../utils/api-client";
import { formatDate } from "../utils/date";

export default function UserDetail() {
  const { username } = useParams();
  const { data, isLoading, isSuccess } = useQuery(
    ["UserDetail", username],
    () => getUserTimeline(username)
  );
  const authUser = useAuthUser();

  if (isLoading) return <Spinner />;

  const user = data?.user;
  const posts = data?.posts;

  if (!user) {
    return <div className="message font-weight-bold">User not found</div>;
  }

  const isAuthUser = authUser?.screen_name === user.screen_name;
  const expanded_url = user.entities.url.urls[0]?.expanded_url;
  const url = user.entities.url.urls[0]?.url;

  return (
    <>
      <Heading title={user.name} backButton />
      <Figure
        style={{
          height: "200px",
          width: "100%",
          backgroundImage: `url(${user.profile_banner})`,
        }}
      />
      <div className="p-3 border-bottom">
        <Row className="d-flex justify-content-between mt-n2 px-2 align-items-center w-100">
          <Figure
            style={{ height: "100px", width: "100px" }}
            className="mt-n5 rounded-circle overflow-hidden bg-primary"
          >
            <Figure.Image
              className="w-100 h-100"
              src={user.profile_image_url_https}
            />
          </Figure>
          {isAuthUser ? (
            <Link
              className="btn btn-outline-primary px-3 rounded-pill font-weight-bold"
              to="/settings/profile"
            >
              Edit profile
            </Link>
          ) : (
            <FollowButton user={user} />
          )}
        </Row>
        <div className="flex flex-column">
          <h5 className="mb-0">
            <b>{user.name}</b>
          </h5>
          <div className="text-muted">@{user.screen_name}</div>
        </div>
        <blockquote
          style={{ maxHeight: "300px" }}
          className="my-1 overflow-y-auto"
        >
          <WithUrls>{user.description}</WithUrls>
        </blockquote>
        <Row className="d-flex justify-content-between mt-2">
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1"
                icon={faLocation}
                style={{ fontSize: "1em" }}
              />
              <span className="ml-1">{user.location || "Unknown"}</span>
            </div>
          </Col>
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1"
                icon={faDate}
                style={{ fontSize: "1em" }}
              />
              <span className="ml-1">Joined {formatDate(user.created_at)}</span>
            </div>
          </Col>
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1 mr-1"
                icon={faLink}
                style={{ fontSize: "1em" }}
              />
              <WithUrls>{expanded_url || url}</WithUrls>
            </div>
          </Col>
        </Row>
        <Row className="d-flex my-2">
          <Link
            to={`/user/${user.screen_name}/followers`}
            className="text-muted mr-2"
          >
            {user.followers_count} <span>Followers</span>
          </Link>
          <Link
            to={`/user/${user.screen_name}/friends`}
            className="text-muted mr-2"
          >
            {user.friends_count} <span>Following</span>
          </Link>
        </Row>
      </div>
      <h5 className="m-2 pb-2 border-bottom">
        {user.statuses_count} <span className="text-muted">Posts</span>
      </h5>
      <PostsList posts={posts} isSuccess={isSuccess} />
    </>
  );
}
