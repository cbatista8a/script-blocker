import { patterns, TYPE_ATTRIBUTE } from "./variables";
import {getConfig} from './storage';

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

export const shouldBlockScript = async function (id, script) {
  let user_preferences = getConfig();
  if (id in user_preferences) {
    return user_preferences[id].isBlocked();
  }

  const src = script.getAttribute("src");
  const type = script.getAttribute("type");

  if (isOnWhiteList(src) || (type !== TYPE_ATTRIBUTE && !isOnBlacklist(src))) {
    return false;
  }

  return true;
};
