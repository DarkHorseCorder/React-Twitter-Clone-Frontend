import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";
import { getNotifications } from "../utils/api-client";

export default function BottomNav() {
  const authUser = useAuthUser();
  const { data: notifications } = useQuery("Notifications", getNotifications);

  const notificationsCount = notifications?.filter((n) => !n.read).length;

  const list = [
    {
      name: "Home",
      href: "/home",
      icon: faHome,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: faSearch,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: faBell,
      count: notificationsCount,
    },
    {
      name: "Profile",
      href: `/user/${authUser?.screen_name}`,
      icon: faUser,
    },
  ];

  return (
    <div className="fixed-bottom bg-white d-flex justify-content-around border">
      <Link
        style={{
          right: ".5em",
          bottom: "4em",
          fontSize: "1.1em",
        }}
        to="/compose/post"
        className="btn btn-primary rounded-circle position-absolute"
      >
        <svg
          viewBox="0 0 24 24"
          style={{ height: 35, padding: 5, fill: "white" }}
        >
          <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" />
        </svg>
      </Link>
      {list.map((item) => {
        const badge = item.count ? (
          <>
            <Badge
              className="position-absolute"
              variant="primary"
              style={{ top: 6, right: 6, left: "unset" }}
            >
              {item.count}
            </Badge>
            <span className="sr-only">new items</span>
          </>
        ) : null;

        return (
          <div
            key={item.name}
            className="d-flex align-items-top position-relative"
          >
            <NavLink
              key={item.name}
              to={item.href}
              activeClassName="active"
              className="btn btn-naked-primary rounded-pill p-3"
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </NavLink>
            {badge}
          </div>
        );
      })}
    </div>
  );
}
