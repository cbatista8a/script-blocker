import { monkey } from "./monkey";
import { observer } from "./observer";
export { unblock } from "./manager";

import { openCookiesDialog, closeCookiesDialog } from "./modal-handler";
import dialog_modal from "./dialog.html?raw";
import styles from "./style.css";
import { MODAL_CONTAINER_ID } from "./variables";
import { initializeOptions } from "./ui";


function createModal() {
  let cookie_dialog = document.createElement("div");
  cookie_dialog.id = MODAL_CONTAINER_ID;
  cookie_dialog.innerHTML = dialog_modal;

  document.querySelector("body").appendChild(cookie_dialog);
}

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


