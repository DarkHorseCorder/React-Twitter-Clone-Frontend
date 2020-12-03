import Heading from "components/Heading";
import MultiMedia from "components/MultiMedia";
import PostsList from "components/PostsList";
import PostTag from "components/PostTag";
import PostText from "components/PostText";
import QuotedPost from "components/QuotedPost";
import ReactionsBar from "components/ReactionsBar";
import UserLink from "components/UserLink";
import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getPostById, getReplies } from "../utils/api-client";
import { formatDate, formatTime } from "../utils/date";

export default function PostDetail() {
  const { postId } = useParams();
  const { data: post, isLoading } = useQuery("PostDetail", () =>
    getPostById(postId)
  );
  const { data: replies, isSuccess } = useQuery("PostReplies", () =>
    getReplies(postId)
  );

  if (isLoading) return <Spinner />;

  if (!post) {
    return <div className="message font-weight-bold">Post not found</div>;
  }

  return (
    <>
      <Heading backButton title="Post" />
      <Col className="p-3 d-flex flex-column">
        <Row className="d-flex px-3 pb-1 mt-n2 text-muted">
          <PostTag post={post} />
        </Row>
        <Row>
          <Row>
            <UserLink
              user={post.user}
              className="rounded-circle"
              to={`/user/${post.user.screen_name}`}
            >
              <Figure
                className="bg-border-color rounded-circle mr-2 overflow-hidden"
                style={{ height: "50px", width: "50px" }}
              >
                <Figure.Image
                  src={post.user.profile_image_url_https}
                  className="w-100 h-100"
                />
              </Figure>
            </UserLink>
            <Col className="d-flex flex-column">
              <UserLink
                user={post.user}
                to={`/user/${post.user.screen_name}`}
                className="text-dark font-weight-bold mr-1"
              >
                {post.user.name}
              </UserLink>
              <span className="text-muted mr-1">@{post.user.screen_name}</span>
            </Col>
          </Row>
          <Row></Row>
        </Row>
        <Row>
          <blockquote style={{ fontSize: "1.5em" }} className="my-2 mw-100">
            <PostText post={post} expanded />
          </blockquote>
        </Row>
        <Row className="mb-2">
          <MultiMedia post={post} expanded />
          <QuotedPost post={post.quoted_status} className="mt-2" />
        </Row>
        <Row>
          <span className="text-muted pb-2">
            {formatTime(post.created_at)}
            {" - "}
            {formatDate(post.created_at)}
          </span>
        </Row>
        <Row className="border-top border-bottom d-flex p-2">
          <div className="py-1 pr-3">
            <span className="font-weight-bold mr-1">{post.favorite_count}</span>
            <Link to={`/post/${post.id_str}/likes`} className="text-muted">
              Likes
            </Link>
          </div>
          <div className="py-1 pr-3">
            <span className="font-weight-bold mr-1">{post.retweet_count}</span>
            <Link to={`/post/${post.id_str}/reposts`} className="text-muted">
              Reposts
            </Link>
          </div>
        </Row>
        <Row className="d-flex justify-content-end align-items-center mt-2 border-bottom">
          <ReactionsBar post={post} />
        </Row>
        <PostsList no_reply_tag posts={replies} isSuccess={isSuccess} />
      </Col>
    </>
  );
}
