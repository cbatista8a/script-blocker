import { patterns, TYPE_ATTRIBUTE } from './variables'
import { getAvailableStorage } from "./storage";

export const isOnBlacklist = (src, type) => (
    src &&
    (!type || type !== TYPE_ATTRIBUTE) &&
    (
        (!patterns.blacklist || patterns.blacklist.some(pattern => pattern.test(src))) &&
        (!patterns.whitelist || patterns.whitelist.every(pattern => !pattern.test(src)))
    )
)

export const willBeUnblocked = function(script) {
    const src = script.getAttribute('src')
    return (
        patterns.blacklist && patterns.blacklist.every(entry => !entry.test(src)) ||
        patterns.whitelist && patterns.whitelist.some(entry => entry.test(src))
    )
}

export const shouldBlockScript = async function(script) {
    const src = script.getAttribute('src');
    const type = script.getAttribute('type');
  
    // Verificar el estado del script en user_preferences en el almacenamiento
    const user_preferences = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
    const scriptId = await generateSHA256Hash(script.outerHTML);
  
    const userScript = user_preferences.find(scriptObj => scriptObj.id === scriptId);
  
    if (userScript) {
      return userScript.isBlocked(); // Bloquear o desbloquear según el estado guardado en user_preferences.
    }
  
    if (patterns.whitelist && patterns.whitelist.some(pattern => pattern.test(src))) {
      return false; // No se bloquea si la URL del script coincide con un patrón de la lista blanca.
    }
  
    if ((type === TYPE_ATTRIBUTE) || patterns.blacklist && patterns.blacklist.some(pattern => pattern.test(src))) {
      return true; // Se bloquea si la URL del script coincide con un patrón de la lista negra.
    }
  
    return true; // Por defecto, se bloquea.
  };
  