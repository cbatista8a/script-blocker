import { saveConfig, user_preferences } from "./storage";
import {
  STATUS_BLOCKED,
  STATUS_UNBLOCKED} from "./variables";


export function addUiOption(script_id, status, script_name = '') {
  let target_element_container = document.querySelector("#cookie_content");
  let label = document.createElement("label");
  let option = document.createElement("input");
  option.type = "checkbox";
  option.className = "cookie-option";
  option.value = script_id;
  option.addEventListener('change',function(event){
    const script_id = this.value;
    if(script_id in user_preferences){
      user_preferences[script_id].status = user_preferences[script_id].status === STATUS_UNBLOCKED ? STATUS_BLOCKED : STATUS_UNBLOCKED;
      saveConfig(user_preferences);
    }
  });

  if (status === STATUS_UNBLOCKED) {
    option.setAttribute("checked", true);
  }

  label.appendChild(option);
  label.append(script_name ? script_name : script_id); // TODO set user friendly name
  target_element_container.appendChild(label);
}



