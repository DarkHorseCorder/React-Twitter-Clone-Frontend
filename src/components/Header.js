import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faComments } from "@fortawesome/free-regular-svg-icons/faComments";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { faListAlt } from "@fortawesome/free-regular-svg-icons/faListAlt";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { faHashtag } from "@fortawesome/free-solid-svg-icons/faHashtag";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import MediaQuery from "react-responsive";
import { Link, NavLink } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";
import { getNotifications } from "../utils/api-client";

export default function Header() {
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
      icon: faHashtag,
    },
    {
      name: "Profile",
      href: `/user/${authUser?.screen_name}`,
      icon: faUser,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: faBell,
      count: notificationsCount,
    },
    {
      name: "Chat Room",
      href: "/chats",
      icon: faComments,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: faEllipsisH,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: faEnvelope,
    },
    {
      name: "Lists",
      href: "/lists",
      icon: faListAlt,
    },
  ];

  return (
    <Col className="d-flex flex-column align-items-end vh-100 overflow-y-auto mr-sm-n3 mr-md-0 mr-xl-3 hide-scroll">
      <div className="m-2 mr-xl-auto ml-xl-4">
        <Link
          className="btn text-primary btn-naked-primary rounded-circle p-2"
          to="/home"
        >
          <FontAwesomeIcon size="2x" icon={faTwitter} />
        </Link>
      </div>
      <div className="ml-0 d-flex flex-column mb-2 align-items-start">
        {list.map((item) => {
          const badge = item.count ? (
            <>
              <Badge
                className="position-absolute"
                variant="primary"
                style={{ top: 5, right: 5, left: "unset" }}
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
                to={item.href}
                className="px-xl-2 py-xl-1 p-1 mb-1 mx-lg-0 mx-auto btn btn-naked-primary rounded-pill font-weight-bold btn-lg d-flex align-items-center"
                activeClassName="active"
              >
                <FontAwesomeIcon className="m-2" size="lg" icon={item.icon} />
                <span className="d-none d-xl-block mr-2">{item.name}</span>
              </NavLink>
              {badge}
            </div>
          );
        })}
      </div>
      <Link
        className="d-flex btn btn-primary font-weight-bold p-xl-3 rounded-pill"
        id="compose"
        to="/compose/post"
      >
        <span className="d-none d-xl-block mx-auto px-5">Post</span>
        <MediaQuery maxWidth={1199}>
          <svg
            viewBox="0 0 24 24"
            style={{ height: 35, padding: 5, fill: "white" }}
          >
            <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" />
          </svg>
        </MediaQuery>
      </Link>
    </Col>
  );
}
