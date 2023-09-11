
import {init,unblock,openCookiesDialog,closeCookiesDialog} from './src/index';
import dialog_modal from './src/dialog.html?raw';
import './src/style.css?inline';

init();

window.openCookiesDialog = openCookiesDialog;
window.closeCookiesDialog = closeCookiesDialog;

let cookie_dialog = document.createElement('div');
cookie_dialog.id = 'cookie_dialog';
cookie_dialog.innerHTML = dialog_modal;

document.querySelector('body').appendChild(cookie_dialog);