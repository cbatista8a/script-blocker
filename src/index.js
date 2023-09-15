import { monkey } from "./monkey";
import { observer } from "./observer";
export { unblock } from "./manager";

import { openCookiesDialog, closeCookiesDialog, createModal } from "./modal-handler";
import styles from "./style.css";
import { initializeOptions } from "./ui";


export function init() {
  window.openCookiesDialog = openCookiesDialog;
  window.closeCookiesDialog = closeCookiesDialog;

  createModal();

  // Starts the monitoring
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  monkey();

  document.addEventListener("DOMContentLoaded", function () {
    observer.disconnect();
    initializeOptions();
  });
}


