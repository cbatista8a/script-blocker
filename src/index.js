import { monkey } from "./monkey";
import { observer } from "./observer";
export { unblock } from "./unblock";
import { willBeUnblocked } from "./checks";
import { scriptsArray, STATUS_BLOCKED, STATUS_UNBLOCKED, Script, STORAGE_NAME } from "./variables";
import {generateSHA256Hash, verifyHash} from './hasher';
import { getAvailableStorage } from "./storage";



export function init() {
  // Starts the monitoring
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  monkey();

  initializeOptions();
}

//Todo implement state save for scripts on session storage
async function initializeOptions() {
  let target_element_container = document.querySelector("#cookie_content");
  let scripts = document.querySelectorAll("script");
  const storage = getAvailableStorage();
  let user_preferences = JSON.parse(storage.getItem(STORAGE_NAME)) || {};

  for (const script of scripts) {
    const script_id = await generateSHA256Hash(script.outerHTML);
    let status = STATUS_BLOCKED;

    let label = document.createElement("label");
    let option = document.createElement("input");
    option.type = "checkbox";
    option.className = "cookie-option";
    option.value = script_id;

    if(script_id in user_preferences){
        status = user_preferences[script_id].status;
    } else if (willBeUnblocked(script)){
      status = STATUS_UNBLOCKED;
    }

    status == STATUS_UNBLOCKED ? option.setAttribute("checked", "checked") : option.setAttribute("checked", null);
    label.appendChild(option);
    label.append(script_id); // TODO set user friendly name
    target_element_container.appendChild(label);
    
    user_preferences[script_id] = new Script(script_id, status);
  }

  storage.setItem(STORAGE_NAME, JSON.stringify(user_preferences));
}


