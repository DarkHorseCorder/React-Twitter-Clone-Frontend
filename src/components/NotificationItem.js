import PostText from "components/PostText";
import QuotePost from "components/QuotedPost";
import React from "react";
import { Figure, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";
import { readNotification } from "../utils/api-client";

export default function NotificationItem({ notification }) {
  const authUser = useAuthUser();

  function handleReadNotification() {
    if (!notification.read) {
      readNotification(notification);
    }
  }

  const active = notification.read
    ? ""
    : "bg-bg-color border-left-right-primary-custom";
  const { post, user } = notification.body;
  let body;
  let heading;
  let anchor = "/notifications";
  let tag = notification.title;

  switch (notification.type) {
    case "mentioned":
      anchor = `/post/${post.id_str}`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{post.user.screen_name}</b> mentioned you in post
          </p>
          <blockquote className="bg-light mt-n2 p-2 border-left-right-secondary-custom">
            <PostText post={post} />
          </blockquote>
        </div>
      );
      break;
    case "replied":
      anchor = `/post/${post.id_str}`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{post.user.screen_name}</b> replied
          </p>
          <QuotePost post={post} />
        </div>
      );
      break;
    case "liked":
      anchor = `/post/${post.id_str}/likes`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user.screen_name}</b> liked
          </p>
          <QuotePost post={post} />
        </div>
      );
      break;
    case "followed":
      anchor = `/user/${authUser?.screen_name}/followers`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user.screen_name}</b> started following you
          </p>
        </div>
      );
      break;
    case "unfollowed":
      anchor = `/user/${user.screen_name}`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user.screen_name}</b> no longer follows you
          </p>
        </div>
      );
      break;
    case "reposted":
      anchor = `/post/${post.id_str}/reposts`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user.screen_name}</b> reposted
          </p>
          <QuotePost post={post} />
        </div>
      );
      break;
    default:
      break;
  }

  if (user) {
    heading = (
      <div className="d-flex">
        <Link to={`/user/${user.screen_name}`}>
          <Figure
            className="bg-border-color rounded-circle overflow-hidden mr-1 mb-2"
            style={{ height: "45px", width: "45px" }}
          >
            <Figure.Image
              src={user.profile_image_url_https}
              className="w-100 h-100"
            />
          </Figure>
        </Link>
      </div>
    );
  }

  return (
    <ListGroup.Item
      onClick={handleReadNotification}
      className={`${active} px-lg-5 px-xs-2 px-sm-4`}
      action
      as="div"
    >
      <Link className="stretched-link" to={anchor} />
      <div className="mt-n2 mb-2">
        <small>{tag}</small>
      </div>
      {heading}
      {body}
    </ListGroup.Item>
  );
}
