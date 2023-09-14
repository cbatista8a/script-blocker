import { monkey } from "./monkey";
import { observer } from "./observer";
export { unblock } from "./manager";
import { shouldBlockScript } from "./checks";
import {
  STATUS_BLOCKED,
  STATUS_UNBLOCKED,
  Script,
  STORAGE_NAME,
} from "./variables";
import { generateSHA256Hash } from "./hasher";
import { saveConfig } from "./storage";

import { openCookiesDialog, closeCookiesDialog } from "./modal-handler";
import dialog_modal from "./dialog.html?raw";
import styles from "./style.css";

let cookie_dialog = document.createElement("div");
cookie_dialog.id = "cookie_container";
cookie_dialog.innerHTML = dialog_modal;

document.querySelector("body").appendChild(cookie_dialog);

window.openCookiesDialog = openCookiesDialog;
window.closeCookiesDialog = closeCookiesDialog;

export function init() {
  // Starts the monitoring
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  monkey();

  document.addEventListener("DOMContentLoaded", function () {
    observer.disconnect();
    initializeOptions();
  });
}

//Todo implement state save for scripts on session storage
async function initializeOptions() {
  let target_element_container = document.querySelector("#cookie_content");
  let scripts = document.querySelectorAll("script");
  let user_preferences = {};
  for (const script of scripts) {
    const script_id = await generateSHA256Hash(script.outerHTML);
    let status = STATUS_BLOCKED;

    let label = document.createElement("label");
    let option = document.createElement("input");
    option.type = "checkbox";
    option.className = "cookie-option";
    option.value = script_id;

    if (!shouldBlockScript(script)) {
      status = STATUS_UNBLOCKED;
      option.setAttribute("checked", "checked");
    }
    label.appendChild(option);
    label.append(script_id); // TODO set user friendly name
    target_element_container.appendChild(label);

    user_preferences[script_id] = new Script(script_id, status);
  }

  saveConfig(user_preferences);
}
