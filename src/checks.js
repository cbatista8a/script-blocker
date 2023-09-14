import { patterns, TYPE_ATTRIBUTE, user_preferences } from "./variables";

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
  const src = script.getAttribute("src");
  const type = script.getAttribute("type");
  const scriptId = await generateSHA256Hash(script.outerHTML);

  const userScript = user_preferences.find(
    (scriptObj) => scriptObj.id === scriptId
  );

  if (userScript) {
    return userScript.isBlocked();
  }

  if (isOnWhiteList(src) || (type !== TYPE_ATTRIBUTE && !isOnBlacklist(src))) {
    return false;
  }

  return true;
};
