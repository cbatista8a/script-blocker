import { monkey } from "./monkey";
import { observer } from "./observer";
export { unblock } from "./unblock";
import { willBeUnblocked } from "./checks";
import { scriptsArray, STATUS_BLOCKED, STATUS_UNBLOCKED, Script, STORAGE_NAME } from "./variables";

export function init() {
  // Starts the monitoring
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  monkey();
}

export function openCookiesDialog() {
  let dialog = document.querySelector("#cookie_dialog");
  if (!dialog.open) {
    dialog.showModal();
  }
}

export function closeCookiesDialog() {
  let dialog = document.querySelector("#cookie_dialog");
  if (dialog.open) {
    dialog.close();
  }
}

//Todo implement state save for scripts on session storage
export function initializeOptions() {
  let target_element_container = document.querySelector("#cookie_content");
  let scripts = document.querySelectorAll("script");
  const storage = getAvailableStorage();
  scriptsArray = JSON.parse(storage.getItem(STORAGE_NAME)) || [];
  scripts.forEach((script, index) => {
    let status = STATUS_BLOCKED;
    let label = document.createElement("label");
    let option = document.createElement("input");
    option.type = "checkbox";
    option.className = "cookie-option";
    option.value = script.src || index + 1;
    if (willBeUnblocked(script)) {
      option.setAttribute("checked", "checked");
      status = STATUS_UNBLOCKED;
    }
    label.appendChild(option);
    label.append(index + 1); // TODO set user friendly name
    target_element_container.appendChild(label);

    scriptsArray[index] = new Script(option.value, index, status);
    storage.setItem(STORAGE_NAME, JSON.stringify(scriptsArray));
  });
}

export function getAvailableStorage() {
  try {
    return window.localStorage ? window.localStorage : window.sessionStorage;
  } catch (e) {
    alert("Browser Storage not available and we don\'t able to handle user preferences for cookies");
  }
  return null;
}
