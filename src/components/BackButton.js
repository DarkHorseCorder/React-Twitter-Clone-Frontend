import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";

export default function BackButton() {
  const history = useHistory();

  return (
    <button
      onClick={history.goBack}
      className="ml-2 btn btn-naked-primary rounded-circle text-primary"
    >
      <FontAwesomeIcon icon={faArrowLeft} size="lg" />
    </button>
  );
}
