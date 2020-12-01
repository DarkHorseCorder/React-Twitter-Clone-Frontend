import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faComment as commentSolid } from "@fortawesome/free-solid-svg-icons/faComment";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  likePost,
  repostPost,
  unlikePost,
  unrepostPost,
} from "../utils/api-client";

export default function ReactionsBar({ post }) {
  function handleToggleLike() {
    post.favorited ? unlikePost(post) : likePost(post);
  }

  function handleToggleRepost() {
    post.retweeted ? unrepostPost(post) : repostPost(post);
  }

  return (
    <div className="d-flex align-items-center">
      <Dropdown drop="up" className="bg-clear high-index">
        <Dropdown.Toggle
          className="btn btn-naked-primary rounded-pill"
          id="comment-dropdown"
        >
          {post.retweeted ? (
            <FontAwesomeIcon icon={commentSolid} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faComment} />
          )}
          <small className="m-1">{post.retweet_count}</small>
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight className="higher-index rounded-0">
          <Dropdown.Item
            onClick={handleToggleRepost}
            className="high-index"
            as="button"
          >
            {post.retweeted ? "Undo Repost" : "Repost"}
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            className="high-index"
            to={`/compose/post?quote=${post.id_str}`}
          >
            Quote this post
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link
        to={`/compose/post?reply_to=${post.id_str}`}
        className="btn btn-naked-secondary rounded-pill high-index"
      >
        <FontAwesomeIcon
          style={{ fontSize: "1.2em" }}
          className="mb-1 text-muted"
          icon={faReply}
        />
      </Link>
      <button
        onClick={handleToggleLike}
        className="btn btn-naked-danger rounded-pill high-index"
      >
        {post.favorited ? (
          <FontAwesomeIcon icon={heartSolid} className="text-danger" />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
        <small className="m-1">{post.favorite_count}</small>
      </button>
    </div>
  );
}
