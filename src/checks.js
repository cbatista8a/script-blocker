import { patterns, TYPE_ATTRIBUTE } from "./variables";
import {user_preferences} from './storage';

function isOnWhiteList(src) {
  return (
    patterns.whitelist &&
    patterns.whitelist.some((pattern) => pattern.test(src))
  );
}

export function shouldBlockScript (id, node) {
  if (id in user_preferences) {
    return user_preferences[id].isBlocked();
  }

  const src = node.getAttribute("src");
  const type = node.getAttribute("type");

  if ((type !== TYPE_ATTRIBUTE && isOnWhiteList(src))) {
    return false;
  }

  return true;
}
