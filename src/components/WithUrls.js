import React from "react";
import { unescape } from "html-escaper";
import anchorme from "anchorme";
import DOMPurify from "dompurify";

export default function WithUrls({ children }) {
  if (!children || !children.toString) {
    return null;
  }

  let text = children.toString();
  text = DOMPurify.sanitize(unescape(text), { ALLOWED_TAGS: ["b"] });

  text = anchorme({
    input: text,
    options: {
      attributes: {
        target: "_blank",
        rel: "noopener noreferrer",
        class: "text-wrap break-all",
      },
      truncate: 50,
    },

    extensions: [
      {
        test: /#(\w|_)+/gi,
        transform: (string) =>
          `<a class="high-index" href="/search?q=${encodeURIComponent(
            string
          )}"> ${string} </a>`,
      },
      {
        test: /@(\w|_)+/gi,
        transform: (string) =>
          `<a class="high-index" href="/user/${string.slice(1)}">${string}</a>`,
      },
    ],
  });

  if (DOMPurify.sanitize(text, { ALLOWED_TAGS: [] }).trim() === "") {
    text = "null";
  }

  return (
    <>
      <div
        className="mw-100 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </>
  );
}
