
import {init} from './src/index';
import { openCookiesDialog, closeCookiesDialog } from "./src/modal-handler";
import dialog_modal from './src/dialog.html?raw';
import styles from './src/style.css';

let cookie_dialog = document.createElement('div');
cookie_dialog.id = 'cookie_container';
cookie_dialog.innerHTML = dialog_modal;

document.querySelector('body').appendChild(cookie_dialog);

window.openCookiesDialog = openCookiesDialog;
window.closeCookiesDialog = closeCookiesDialog;

init();