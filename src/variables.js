export const TYPE_ATTRIBUTE = "javascript/blocked";
export const STATUS_BLOCKED = 'blocked';
export const STATUS_UNBLOCKED = 'unblocked';
export const STORAGE_NAME = "scripts-config";
export const MODAL_CONTAINER_ID = "cookie_container";

window.YETT_BLACKLIST = window.YETT_BLACKLIST || [];
window.YETT_WHITELIST = window.YETT_WHITELIST || [];

export const patterns = {
  blacklist: window.YETT_BLACKLIST || [],
  whitelist: window.YETT_WHITELIST || [],
};

// Backup list containing the original blacklisted script elements
export const backupScripts = [];

export class Script {
  constructor(id, status) {
    this.id = id;
    this.status = status;
  }

  isBlocked() {
    return this.status === STATUS_BLOCKED;
  }
}
