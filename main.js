
import {init,unblock,openCookiesDialog,closeCookiesDialog, initializeOptions} from './src/index';
import dialog_modal from './src/dialog.html?raw';
import styles from './src/style.css';

init();

let cookie_dialog = document.createElement('div');
cookie_dialog.id = 'cookie_container';
cookie_dialog.innerHTML = dialog_modal;

document.querySelector('body').appendChild(cookie_dialog);

window.openCookiesDialog = openCookiesDialog;
window.closeCookiesDialog = closeCookiesDialog;

initializeOptions();