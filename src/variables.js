import { getAvailableStorage } from "./storage";


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

const storage = getAvailableStorage();

export let user_preferences = JSON.parse(storage.getItem(STORAGE_NAME)) || {};

export class Script {
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }

    isBlocked() {
        return this.status === STATUS_BLOCKED;
    }
}