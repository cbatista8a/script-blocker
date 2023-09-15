import { TYPE_ATTRIBUTE } from "./variables";
import { shouldBlockScript } from "./checks";
import {generateSHA256Hash} from './hasher';

export function monkey() {
  const createElementBackup = document.createElement;

  const originalDescriptors = {
    src: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src"),
    type: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "type"),
  };

  // Monkey patch the createElement method to prevent dynamic scripts from executing
  document.createElement = function (...args) {
    // If this is not a script tag, bypass
    const node = createElementBackup.bind(document)(...args);
    if (args[0].toLowerCase() !== "script") {
      return node;
    }
    // Define getters / setters to ensure that the script type is properly set
    const script_id = generateSHA256Hash(node.outerHTML);
    debugger;
    try {
      Object.defineProperties(node, {
        src: {
          ...originalDescriptors.src,
          set(value) {
            if (shouldBlockScript(script_id, node)) {
              originalDescriptors.type.set.call(this, TYPE_ATTRIBUTE);
            }
            originalDescriptors.src.set.call(this, value);
          },
        },
        type: {
          ...originalDescriptors.type,
          get() {
            const typeValue = originalDescriptors.type.get.call(this);
            if (shouldBlockScript(script_id,this)) {
              // Prevent script execution.
              return null;
            }
            return typeValue;
          },
          set(value) {
            const typeValue = shouldBlockScript(script_id, node)
              ? TYPE_ATTRIBUTE
              : value;
            originalDescriptors.type.set.call(this, typeValue);
          },
        },
      });

      // Monkey patch the setAttribute function so that the setter is called instead
      node.setAttribute = function (name, value) {
        if (name === "type" || name === "src"){
          node[name] = value;
        } 
        else{
          HTMLScriptElement.prototype.setAttribute.call(node, name, value);
        } 
      };
    } catch (error) {
      // eslint-disable-next-line
      console.warn(
        "Yett: unable to prevent script execution for script src ",
        node.src,
        ".\n",
        'A likely cause would be because you are using a third-party browser extension that monkey patches the "document.createElement" function.'
      );
    }
    return node;
  };
}
