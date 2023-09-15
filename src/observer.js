import { shouldBlockScript } from "./checks";
import { blockScript } from "./manager";
import { generateSHA256Hash } from "./hasher";

const handleAddedScript = async (node) => {
  const script_id = await generateSHA256Hash(script.outerHTML);
  if (shouldBlockScript(script_id, node)) {
    node
    blockScript(script_id, node);
  }
};

export const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") {
        handleAddedScript(node);
      }
    }
  }
});
