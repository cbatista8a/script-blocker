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
