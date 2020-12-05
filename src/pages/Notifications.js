import Heading from "components/Heading";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";
import NotificationItem from "../components/NotificationItem";
import Spinner from "../components/Spinner";
import { getNotifications } from "../utils/api-client";

export default function Notifications() {
  const { data: notifications, isLoading, isSuccess } = useQuery(
    "Notifications",
    getNotifications
  );

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading title="Notifications" btnProfile backButton />
      <ListGroup variant="flush">
        {isSuccess ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <div className="message font-weight-bold">No notifications yet</div>
        )}
      </ListGroup>
    </>
  );
}
