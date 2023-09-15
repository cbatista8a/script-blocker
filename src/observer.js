import { shouldBlockScript } from "./checks";
import { blockScript } from "./manager";
import { generateSHA256Hash } from "./hasher";
import { STATUS_BLOCKED, STATUS_UNBLOCKED } from "./variables";
import { addUiOption } from "./ui";

async function handleAddedScript(node) {
  const script_id = await generateSHA256Hash(node.outerHTML);
  node.setAttribute("id", script_id);
  const script_name = node.getAttribute('data-name') || '';
  let status = STATUS_UNBLOCKED;
  if (shouldBlockScript(script_id, node)) {
    blockScript(script_id, node);
    status = STATUS_BLOCKED;
  }
  addUiOption(script_id, status, script_name);
}

export const observer = new MutationObserver(trackScripts);

function trackScripts(mutations) {
  for (const mutation of mutations) {
    for (let node of mutation.addedNodes) {
      if (node.tagName === "SCRIPT") {
        handleAddedScript(node);
      }
    }
  }
}
