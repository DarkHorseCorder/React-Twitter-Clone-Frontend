import React from "react";
import { Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import BackButton from "./BackButton";
import ButtonProfile from "./ButtonProfile";
import LogoutButton from "./LogoutButton";

export default function Heading(props) {
  const { title, btnLogout, backButton, btnProfile } = props;

  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  const showButtonProfile = isMobile && btnProfile;

  return (
    <div className="d-flex justify-content-between border-bottom sticky-top bg-white align-items-center">
      <Row className="d-flex align-items-center">
        {backButton && <BackButton />}
        {showButtonProfile && <ButtonProfile />}
        <h5 className="my-3 mx-2 font-weight-bold">{title}</h5>
      </Row>
      {btnLogout && <LogoutButton />}
    </div>
  );
}
