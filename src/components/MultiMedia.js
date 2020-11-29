import React from "react";
import { Card, Image } from "react-bootstrap";
import { ReactTinyLink } from "react-tiny-link";
import getUrls from "get-urls";

export default function MultiMedia(props) {
  const { post, expanded = false, className } = props;

  const { entities = {}, text } = post;
  let {
    media: [photo] = [],
    urls: [url],
  } = entities;

  if (photo) {
    photo = (
      <Image fluid rounded src={photo.media_url_https} alt="media preview" />
    );
  }

  if (!url) {
    let unparsed_urls = Array.from(getUrls(text));
    if (unparsed_urls.length) {
      url = {
        expanded_url: unparsed_urls[0],
      };
    }
  }

  if (url) {
    url = (
      <ReactTinyLink
        width="100%"
        cardSize={expanded ? "large" : "small"}
        autoPlay={expanded}
        showGraphic
        maxLine={2}
        minLine={1}
        url={url.expanded_url}
      />
    );
  }

  if (photo || url) {
    return (
      <Card
        className={`${className} w-100 bg-transparent`}
        style={{
          maxHeight: !expanded ? "350" : "fit-content",
          overflow: "hidden",
        }}
      >
        {photo}
        <div className="mt-1">{url}</div>
      </Card>
    );
  }

  return null;
}
