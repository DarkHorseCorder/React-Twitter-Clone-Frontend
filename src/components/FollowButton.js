import React from "react";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../context/auth-context";
import { unfollowUser, followUser } from "../utils/api-client";

export default function FollowButton({ user }) {
  const authUser = useAuthUser();
  const [hoverText, setHoverText] = React.useState("");
  const [hoverVariant, setHoverVariant] = React.useState("");

  function handleMouseEnter() {
    user.following && setHoverText("Unfollow");
    user.following && setHoverVariant("danger");
  }

  function handleMouseLeave() {
    setHoverText("");
    setHoverVariant("");
  }

  async function handleUnfollowUser(event) {
    event.preventDefault();
    await unfollowUser(user.screen_name);
    setHoverText("Unfollowed");
  }

  function handleFollowUser(event) {
    event.preventDefault();
    followUser(user.screen_name);
  }

  const text = user.following ? "Following" : "Follow";
  const variant = user.following ? "primary" : "outline-primary";

  const hideFollowButton = !user || authUser?.screen_name === user.screen_name;

  if (hideFollowButton) return null;

  return (
    <Button
      onClick={user.following ? handleUnfollowUser : handleFollowUser}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variant={hoverVariant || variant}
      className="rounded-pill px-3 py-1 font-weight-bold"
    >
      <span>{hoverText || text}</span>
    </Button>
  );
}
