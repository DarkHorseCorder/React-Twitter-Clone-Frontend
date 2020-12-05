export const truncateText = (text, lines) => {
  if (!text) return "";
  let n = 0,
    i = 0;
  let length = text.length;
  for (i = 0; i < length; i++)
    if (text[i] === "\n") if (n++ >= lines - 1) break;
  return text.slice(0, i) + (length > i + 1 ? " ..." : "");
};
