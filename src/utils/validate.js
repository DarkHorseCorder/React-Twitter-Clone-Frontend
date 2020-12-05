import DOMPurify from "dompurify";

export function isTextValid(text) {
  return Boolean(DOMPurify.sanitize(text, { ALLOWED_TAGS: [] }).trim());
}

export function validate(
  input = "",
  type = "custom",
  {
    min_length: min = 1,
    max_length: max = 70,
    regex: reg = null,
    identifier = null,
  } = {}
) {
  identifier = identifier || `input {${type}}`;
  input = input.toString().trim();
  const regexes = {
    username: RegExp(`^[_a-zA-Z0-9]{${min},${max}}$`),
    password: RegExp(`^\\S{${min},${max}}$`),
    name: RegExp(`^.{${min},${max}}$`),
  };
  if (!reg) {
    reg = regexes[type];
  }
  if (reg) {
    if (!reg.test(input)) {
      throw Error(
        `${identifier} must match regex: ${reg} (range between ${min} and ${max} characters)`
      );
    }
  }
  if (type === "html") {
    input = DOMPurify.sanitize(input, { ALLOWED_TAGS: ["b"] }).trim();
  }
  if (input.length > max || input.length < min) {
    throw Error(
      `${identifier} must be minimum ${min} and maximum ${max} characters`
    );
  }
  if (input.includes("\n")) {
    input = input.replace(/\n+/g, "\n").trim();
  }

  return input;
}
