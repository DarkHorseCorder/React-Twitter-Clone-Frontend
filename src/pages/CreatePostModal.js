import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import { faSmile } from "@fortawesome/free-regular-svg-icons/faSmile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuotedPost from "components/QuotedPost";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React from "react";
import { Alert, Media, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useAuthUser } from "../context/auth-context";
import { createPost, getPostById } from "../utils/api-client";
import { isTextValid, validate } from "../utils/validate";

export default function CreatePostModal() {
  const history = useHistory();
  const quoteId = new URLSearchParams(history.location.search).get("quote");
  const replyId = new URLSearchParams(history.location.search).get("reply_to");
  const { data: quotePost } = useQuery(
    "QuotePost",
    () => getPostById(quoteId),
    {
      enabled: Boolean(quoteId),
    }
  );
  const { data: replyPost } = useQuery(
    "ReplyPost",
    () => getPostById(replyId),
    {
      enabled: Boolean(replyId),
    }
  );

  const authUser = useAuthUser();
  const [text, setText] = React.useState("");
  const [disabled, setDisabled] = React.useState("");
  const [error, setError] = React.useState(null);

  function handleChange(event) {
    const text = event.target.value;
    setText(text);
    setDisabled(!isTextValid(text));
  }

  async function handleSubmit() {
    try {
      if (disabled) return;
      const content = validate(text.trim(), "html", {
        max_length: 280,
        identifier: "Post",
      });
      setDisabled(true);
      let post = { text: content };
      let url;
      if (replyId) {
        url = `/api/post/${replyId}/reply`;
      } else if (quotePost) {
        post = {
          ...post,
          is_quote_status: true,
          quoted_status_id: quotePost.id,
          quoted_status_id_str: quotePost.id_str,
          quoted_status: quotePost._id,
        };
      }
      await createPost(post, url);
      setDisabled(false);
      setText("");
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleCloseModal() {
    history.goBack();
  }

  function addEmoji(emoji) {
    setText((text) => text + emoji.native);
  }

  const picker = (
    <Popover id="popover-basic">
      <Picker
        onSelect={addEmoji}
        color="#3eaaee"
        sheetSize={32}
        emoji="point_up"
        title="Pick your emoji"
        set="twitter"
      />
    </Popover>
  );

  return (
    <Modal
      className="p-0"
      size="lg"
      scrollable
      show
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title>
          <small className="font-weight-bold">
            {replyId ? "Post your reply" : "Compose post"}
          </small>
        </Modal.Title>
      </Modal.Header>
      {error && (
        <Alert variant="danger" className="font-weight-bold text-white">
          {error}
        </Alert>
      )}
      <Modal.Body className="pt-1 pb-0">
        <Media className="h-100 w-100">
          <img
            className="rounded-circle"
            src={authUser?.profile_image_url_https}
            alt={authUser?.screen_name}
            width={50}
            height={50}
          />
          <Media.Body className="h-100 w-50" style={{ minHeight: "175px" }}>
            <textarea
              className="w-100 p-2 pb-5"
              style={{ height: "auto" }}
              name="text"
              onChange={handleChange}
              value={text}
              placeholder="What's happening?"
            ></textarea>
            <QuotedPost post={replyPost || quotePost} className="mb-2 mt-n5" />
          </Media.Body>
        </Media>
      </Modal.Body>
      <Modal.Footer className="py-1">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div style={{ fontSize: "1.5em" }}>
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="auto-start"
              overlay={picker}
            >
              <button className="text-primary btn btn-lg rounded-circle btn-naked-primary p-2">
                <FontAwesomeIcon size="lg" icon={faSmile} />
              </button>
            </OverlayTrigger>
            <button className="disabled text-primary btn btn-lg rounded-circle btn-naked-primary p-2">
              <FontAwesomeIcon size="lg" icon={faImage} />
            </button>
          </div>
          <div className="right">
            <button
              onClick={handleSubmit}
              disabled={disabled}
              className="btn btn-primary rounded-pill px-3 py-2 font-weight-bold"
            >
              Post
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
