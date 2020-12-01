import React from "react";
import { ListGroup } from "react-bootstrap";
import PostItem from "./PostItem";
import Spinner from "./Spinner";

export default function PostsList(props) {
  const { posts, isLoading, isSuccess, no_reply_tag } = props;

  if (isLoading) return <Spinner />;

  return (
    <ListGroup variant="flush" className="border-bottom">
      {isSuccess ? (
        posts.map(
          (post) =>
            post && (
              <PostItem
                key={post._id}
                post={post}
                no_reply_tag={no_reply_tag}
              />
            )
        )
      ) : (
        <div className="message">No posts for you right now</div>
      )}
    </ListGroup>
  );
}
