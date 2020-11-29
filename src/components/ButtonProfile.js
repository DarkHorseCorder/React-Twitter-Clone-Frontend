import React from "react";
import { Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";

export default function ButtonProfile() {
  const authUser = useAuthUser();

  if (!authUser) {
    return null;
  }

  return (
    <Link
      className="d-flex align-items-end"
      to={`/user/${authUser?.screen_name}`}
    >
      <Figure
        className="bg-border-color rounded-circle overflow-hidden my-auto ml-2"
        style={{ height: "35px", width: "35px" }}
      >
        <Figure.Image
          src={authUser?.profile_image_url_https}
          className="w-100 h-100"
        />
      </Figure>
    </Link>
  );
}
