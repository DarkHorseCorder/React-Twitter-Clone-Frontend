import UsersList from "components/UsersList";
import React from "react";
import { useQuery } from "react-query";
import { getUserSuggestions } from "../utils/api-client";

export default function UserSuggestions(props) {
  const { authUser, ...rest } = props;
  const { data, isLoading, isSuccess } = useQuery(
    "UserSuggestions",
    getUserSuggestions
  );

  const users = data?.filter(
    (user) => user.screen_name !== authUser?.screen_name && !user.following
  );

  if (!users?.length) {
    return <div className="message">No user suggestions for you</div>;
  }

  return (
    <UsersList
      {...rest}
      isSuccess={isSuccess}
      isLoading={isLoading}
      users={users}
    />
  );
}
