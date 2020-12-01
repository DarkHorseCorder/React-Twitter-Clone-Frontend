import FollowButton from "components/FollowButton";
import React from "react";
import { Card, Figure, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import { truncateText } from "../utils/truncate";

export default function UserLink({ user, ...props }) {
  const [show, setShow] = React.useState(undefined);

  return (
    <OverlayTrigger
      show={show}
      placement="auto"
      delay="300"
      overlay={<UserPopover setShow={setShow} user={user} />}
    >
      <Link {...props} />
    </OverlayTrigger>
  );
}

const UserPopover = React.forwardRef(({ user, setShow, ...props }, ref) => {
  return (
    <Popover className="border-0" ref={ref} id="user-popover" {...props}>
      <Card
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(undefined)}
        className="border p-3 bg-transparent m-0"
      >
        <Row className="d-flex justify-content-between align-items-center">
          <Figure
            style={{ height: "65px", width: "65px" }}
            className="rounded-circle overflow-hidden bg-primary mr-3"
          >
            <Figure.Image
              className="w-100 h-100"
              src={user.profile_image_url_https}
            />
          </Figure>
          <FollowButton user={user} />
        </Row>
        <div className="flex flex-column">
          <b>{user.name}</b>
          <div className="text-muted mb-2 mt-0">{user.screen_name}</div>
        </div>
        <blockquote>{truncateText(user.description, 10)}</blockquote>
        <Row className="d-flex flex-column">
          <span className="text-muted">{user.location}</span>
          <span className="text-muted">
            Joined {formatDate(user.created_at)}
          </span>
        </Row>
        <Row className="d-flex mt-1 mb-2">
          <em className="mr-2">
            {user.followers_count} <span className="text-muted">Followers</span>
          </em>
          <div className="mr-2">
            {user.friends_count} <span className="text-muted">Following</span>
          </div>
        </Row>
      </Card>
    </Popover>
  );
});
