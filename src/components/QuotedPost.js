import MultiMedia from "components/MultiMedia";
import PostText from "components/PostText";
import UserLink from "components/UserLink";
import React from "react";
import { Card, Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "../utils/date";

export default function QuotedPost({ post, className, expanded = false }) {
  if (!post) {
    return null;
  }

  return (
    <Card className={`${className} w-100 border bg-white overflow-hidden`}>
      <Link className="stretched-link" to={`/post/${post.id_str}`} />
      <div className="p-2">
        <Row className="d-flex align-items-center">
          <UserLink
            className="rounded-circle d-block"
            to={`/user/${post.user.screen_name}`}
          >
            <Figure
              className="bg-border-color rounded-circle overflow-hidden mr-1 mb-0"
              style={{ height: "25px", width: "25px" }}
            >
              <Figure.Image
                src={post.user.profile_image_url_https}
                className="w-100 h-100"
              />
            </Figure>
          </UserLink>
          <UserLink
            to={`/user/${post.user.screen_name}`}
            className="text-dark font-weight-bold mr-1"
          >
            {post.user.name}
          </UserLink>
          <span className="text-muted">@{post.user.screen_name}</span>
          <pre className="m-0 text-muted">{" - "}</pre>
          <span className="text-muted">{formatCreatedAt(post.created_at)}</span>
        </Row>
        <Row>
          <blockquote className="mb-1">
            <PostText
              post={post}
              to={`/post/${post.id_str}`}
              expanded={expanded}
            />
          </blockquote>
        </Row>
      </div>
      <Row>
        <MultiMedia post={post} className="rounded-0" />
      </Row>
    </Card>
  );
}
