import { shouldBlockScript } from "./checks";
import {
  STATUS_BLOCKED,
  STATUS_UNBLOCKED,
  Script
} from "./variables";
import { generateSHA256Hash } from "./hasher";
import { saveConfig } from "./storage";


export async function initializeOptions() {
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

    if (!shouldBlockScript(script_id, script)) {
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
