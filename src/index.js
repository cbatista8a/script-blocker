import { monkey } from "./monkey";
import { observer } from "./observer";
export { unblock } from "./manager";

import { openCookiesDialog, closeCookiesDialog, createModal } from "./modal-handler";
import styles from "./style.css";


export function init() {
  window.openCookiesDialog = openCookiesDialog;
  window.closeCookiesDialog = closeCookiesDialog;

  createModal();

  monkey();
  // Starts the monitoring
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}


