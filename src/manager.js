import { backupScripts, TYPE_ATTRIBUTE, STATUS_BLOCKED, STATUS_UNBLOCKED, Script } from "./variables";
import {getConfig, saveConfig} from './storage';

export function unblock(script_id) {
  if (script_id in backupScripts) {
    const scriptNode = document.createElement("script");
    scriptNode.outerHTML = backupScripts[script_id];

    document.querySelector('footer')?.appendChild(scriptNode);

    let user_preferences = getConfig();

    if (script_id in user_preferences) {
      user_preferences[script_id].status = STATUS_UNBLOCKED;
      saveConfig(user_preferences);
    }

    delete backupScripts[script_id];
  }
}

export function blockScript(id, node) {
  backupScripts[id] = node;
  node.type = TYPE_ATTRIBUTE;

  // Firefox event listener
  preventExecutionFirefox(node);

  // Remove the node from the DOM
  node.parentElement?.removeChild(node);

  let user_preferences = getConfig();

  if (id in user_preferences) {
    user_preferences[id].status = STATUS_BLOCKED;
  }else{
    user_preferences[id] = new Script(id,STATUS_BLOCKED);
  }
  saveConfig(user_preferences);
}

function preventExecutionFirefox(node) {
  const beforeScriptExecuteListener = (event) => {
    if (node.getAttribute("type") === TYPE_ATTRIBUTE) {
      event.preventDefault();
      node.removeEventListener(
        "beforescriptexecute",
        beforeScriptExecuteListener
      );
    }
  };
  node.addEventListener("beforescriptexecute", beforeScriptExecuteListener);
}
