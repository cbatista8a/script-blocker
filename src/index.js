import { monkey } from './monkey';
import { observer } from './observer';
export { unblock } from './unblock';
import {willBeUnblocked} from './checks';

export function init() {
    // Starts the monitoring
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    monkey();
}

export function openCookiesDialog() {
    let dialog = document.querySelector('#cookie_dialog');
    if(!dialog.open){
        dialog.showModal();
    }
}

export function closeCookiesDialog() {
    let dialog = document.querySelector('#cookie_dialog');
    if(dialog.open){
        dialog.close();
    }
}

//Todo implement state save for scripts on session storage
export function initializeOptions() {
    let target_element_container = document.querySelector('#cookie_content');
    let scripts = document.querySelectorAll('script');

    scripts.forEach((script, index) => {
        let label = document.createElement('label');
        let option = document.createElement('input');
        option.type = 'checkbox';
        option.className = 'cookie-option';
        option.value = script.src || index + 1;
        if(willBeUnblocked(script)){
            option.setAttribute('checked','checked');
        }
        label.appendChild(option);
        label.append(index + 1);
        target_element_container.appendChild(label);
    });
}
