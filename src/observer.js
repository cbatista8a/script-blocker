import { backupScripts, TYPE_ATTRIBUTE } from "./variables";
import { shouldBlockScript } from "./checks";

const handleAddedScript = (node) => {
  if (node.tagName === "SCRIPT" && shouldBlockScript(node)) {
    backupScripts.blacklisted.push([node, node.type]);
    node.type = TYPE_ATTRIBUTE;

    // Firefox event listener
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

    // Remove the node from the DOM
    node.parentElement?.removeChild(node);
  }
};

export const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        handleAddedScript(node);
      }
    }
  }
});
