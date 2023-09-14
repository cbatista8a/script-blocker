import { shouldBlockScript } from "./checks";
import { blockScript } from "./manager";

const handleAddedScript = (node) => {
  if (node.tagName === "SCRIPT" && shouldBlockScript(node)) {
    blockScript(node);
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
