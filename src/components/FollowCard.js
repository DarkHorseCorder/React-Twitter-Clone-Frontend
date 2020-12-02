import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";
import UserSuggestions from "./UserSuggestions";

export default function FollowCard(props) {
  const authUser = useAuthUser();
  const { className, ...rest } = props;

  return (
    <Card className={className}>
      <Card.Header>{props.title}</Card.Header>
      {authUser ? (
        <UserSuggestions authUser={authUser} length={props.length} {...rest} />
      ) : (
        <div className="message">Login to see users and their posts</div>
      )}
      <Card.Footer>
        <Card.Link as={Link} to="/explore/users">
          Show more
        </Card.Link>
      </Card.Footer>
    </Card>
  );
}
