import UserLink from "components/UserLink";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";

export default function PostTag({ post, no_reply_tag }) {
  const authUser = useAuthUser();
  const { retweeted_status } = post;

  const user1 =
    authUser?.screen_name === post.user.screen_name
      ? "You"
      : `@${post.user.screen_name}`;

  const user2 =
    authUser?.screen_name === post.in_reply_to_screen_name
      ? "you"
      : `@${post.in_reply_to_screen_name}`;

  const replyTagText = `${user1} replied to ${user2}`;

  const isRetweet = retweeted_status;
  const isReply = !no_reply_tag && post.in_reply_to_screen_name;

  return (
    <>
      {isRetweet && (
        <UserLink
          user={retweeted_status.user}
          className="text-muted"
          to={`/user/${retweeted_status.user.screen_name}`}
        >
          <small>@{retweeted_status.user.screen_name} retweeted</small>
        </UserLink>
      )}
      {isReply && (
        <Link
          className="text-muted"
          to={`/post/${post.in_reply_to_status_id_str}`}
        >
          <small>{replyTagText}</small>
        </Link>
      )}
    </>
  );
}
