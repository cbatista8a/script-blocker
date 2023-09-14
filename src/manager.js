import { backupScripts, TYPE_ATTRIBUTE } from "./variables";

export function unblock(hash) {
  if (hash in backupScripts) {
    const blockedScript = backupScripts[hash];
    const scriptNode = document.createElement("script");
    scriptNode.outerHTML = blockedScript;

    document.querySelector('footer').appendChild(scriptNode);

    if (hash in user_preferences) {
      user_preferences[hash].status = STATUS_UNBLOCKED;
      storage.setItem(STORAGE_NAME, JSON.stringify(user_preferences));
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
