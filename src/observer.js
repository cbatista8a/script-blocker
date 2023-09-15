import { shouldBlockScript } from "./checks";
import { blockScript } from "./manager";
import { generateSHA256Hash } from "./hasher";

async function handleAddedScript(node) {
  const script_id = await generateSHA256Hash(node.outerHTML);
  node.setAttribute('id',script_id);
  if (shouldBlockScript(script_id, node)) {
    blockScript(script_id, node);
  }
}

export const observer = new MutationObserver(trackScripts);

function trackScripts(mutations) {
  for (const mutation of mutations) {
    if (mutation.type == 'childList') {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") {
          handleAddedScript(node);
        }
      }
    }
  }
}
