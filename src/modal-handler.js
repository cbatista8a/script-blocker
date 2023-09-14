
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
