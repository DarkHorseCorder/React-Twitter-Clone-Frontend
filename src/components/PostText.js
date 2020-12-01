import React from "react";
import WithUrls from "components/WithUrls";
import { truncateText } from "utils/truncate";
import { useHistory } from "react-router-dom";

export default function PostText({ post, to, expanded = false }) {
  const history = useHistory();
  let { text } = post;

  if (!expanded) {
    text = truncateText(text, 5);
  }

  return (
    <div
      {...OnClick((e) => {
        to && history.push(to);
      })}
    >
      <WithUrls>{text}</WithUrls>
    </div>
  );
}

const OnClick = (() => {
  let clickTime = 0;
  let pos = { x: 0, y: 0 };

  return (onClick) => ({
    onMouseDown: ({ nativeEvent: e }) => {
      clickTime = Date.now();
      pos.x = e.x;
      pos.y = e.y;
    },
    onMouseUp: ({ nativeEvent: e }) => {
      Date.now() - clickTime < 500 &&
        pos.x === e.x &&
        pos.y === e.y &&
        e.which === 1 &&
        onClick();
    },
  });
})();
