import { monkey } from './monkey';
import { observer } from './observer';
export { unblock } from './unblock';

export function init() {
    // Starts the monitoring
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    monkey();
}

export function openCookiesDialog(dialog_selector) {
    let dialog = document.querySelector(dialog_selector);
    if(dialog){
        dialog.showModal();
    }
}

export function closeCookiesDialog(dialog_selector) {
    let dialog = document.querySelector(dialog_selector);
    if(dialog){
        dialog.close();
    }
}
