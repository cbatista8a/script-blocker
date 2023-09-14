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
  const raw_storage = JSON.parse(getAvailableStorage().getItem(STORAGE_NAME)) || {};
  let config = {};
  for (const script in raw_storage) {
    config.push(new Script(script.id, script.status));
  }
  return config;
}
