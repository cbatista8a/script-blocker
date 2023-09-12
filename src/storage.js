
export function getAvailableStorage() {
    try {
        return window.localStorage ? window.localStorage : window.sessionStorage;
    } catch (e) {
        alert("Browser Storage not available and we don\'t able to handle user preferences for cookies");
    }
    return null;
}
