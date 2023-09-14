import { backupScripts, TYPE_ATTRIBUTE, STATUS_BLOCKED, STATUS_UNBLOCKED } from "./variables";
import {getConfig as user_preferences, saveConfig} from './storage';

export function unblock(hash) {
  if (hash in backupScripts) {
    const blockedScript = backupScripts[hash];
    const scriptNode = document.createElement("script");
    scriptNode.outerHTML = blockedScript;

    document.querySelector('footer')?.appendChild(scriptNode);

    if (hash in user_preferences) {
      user_preferences[hash].status = STATUS_UNBLOCKED;
      saveConfig(user_preferences);
    }

    delete backupScripts[hash];
  }
}

export function blockScript(hash, node) {
  backupScripts[hash] = node;
  node.type = TYPE_ATTRIBUTE;

  // Firefox event listener
  preventExecutionFirefox(node);

  // Remove the node from the DOM
  node.parentElement?.removeChild(node);
  user_preferences[hash].status = STATUS_BLOCKED;
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
