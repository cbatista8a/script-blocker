import { patterns, TYPE_ATTRIBUTE, user_preferences } from "./variables";
import { generateSHA256Hash } from "./hasher";

function isOnBlacklist(src) {
  return (
    patterns.blacklist &&
    patterns.blacklist.some((pattern) => pattern.test(src))
  );
}

function isOnWhiteList(src) {
  return (
    patterns.whitelist &&
    patterns.whitelist.some((pattern) => pattern.test(src))
  );
}

export const shouldBlockScript = async function (script) {
  const scriptId = await generateSHA256Hash(script.outerHTML);

  if (scriptId in user_preferences) {
    return user_preferences[scriptId].isBlocked();
  }

  const src = script.getAttribute("src");
  const type = script.getAttribute("type");

  if (isOnWhiteList(src) || (type !== TYPE_ATTRIBUTE && !isOnBlacklist(src))) {
    return false;
  }

  return true;
};
