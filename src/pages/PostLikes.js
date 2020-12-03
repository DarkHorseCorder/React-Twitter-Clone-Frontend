import Heading from "components/Heading";
import UsersList from "components/UsersList";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPostLikes } from "../utils/api-client";

export default function PostLikes() {
  const { postId } = useParams();
  const { data: users, isLoading, isSuccess } = useQuery("PostLikes", () =>
    getPostLikes(postId)
  );

  return (
    <>
      <Heading title="Liked by" backButton btnProfile />
      <UsersList
        users={users}
        isLoading={isLoading}
        isSuccess={isSuccess}
        noPop
      />
    </>
  );
}
