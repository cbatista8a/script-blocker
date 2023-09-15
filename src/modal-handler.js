import dialog_modal from "./dialog.html?raw";
import { MODAL_CONTAINER_ID } from "./variables";

export function openCookiesDialog() {
    let dialog = document.querySelector("#cookie_dialog");
    if (!dialog.open) {
        dialog.showModal();
    }
}

export function closeCookiesDialog() {
    let dialog = document.querySelector("#cookie_dialog");
    if (dialog.open) {
        dialog.close();
    }
}
export function createModal() {
  let cookie_dialog = document.createElement("div");
  cookie_dialog.id = MODAL_CONTAINER_ID;
  cookie_dialog.innerHTML = dialog_modal;

  document.querySelector("body").appendChild(cookie_dialog);
}
