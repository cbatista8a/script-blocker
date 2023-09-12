export const TYPE_ATTRIBUTE = 'javascript/blocked'
export const STATUS_BLOCKED = 1;
export const STATUS_UNBLOCKED = 0;
export const STORAGE_NAME = "scripts-config";

export const patterns = {
    blacklist: window.YETT_BLACKLIST,
    whitelist: window.YETT_WHITELIST
}

// Backup list containing the original blacklisted script elements
export const backupScripts = {
    blacklisted: []
}

export let scriptsArray = [];

export class Script {
    constructor(src, position, status) {
        this.src = src;
        this.position = position;
        this.status = status;
    }

    isBlocked() {
        return this.status === STATUS_BLOCKED;
    }
}