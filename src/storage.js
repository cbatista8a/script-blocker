import { STORAGE_NAME, Script } from "./variables";

export function getAvailableStorage() {
  try {
    return window.localStorage ? window.localStorage : window.sessionStorage;
  } catch (e) {
    alert(
      "Browser Storage is not available and we don't able to handle your cookie preferences"
    );
  }
  return null;
}

export function saveConfig(user_preferences) {
  getAvailableStorage().setItem(STORAGE_NAME, JSON.stringify(user_preferences));
}

export function getConfig() {
  let raw_storage = JSON.parse(getAvailableStorage().getItem(STORAGE_NAME)) || {};
  for (const script_id in raw_storage) {
    const script = raw_storage[script_id];
    raw_storage[script_id] = new Script(script_id, script.status);
  }
  return raw_storage;
}
