import { TYPE_ATTRIBUTE } from "./variables";
import { shouldBlockScript } from "./checks";

export function monkey() {
  const createElementBackup = document.createElement;

  const originalDescriptors = {
    src: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src"),
    type: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "type"),
  };

  // Monkey patch the createElement method to prevent dynamic scripts from executing
  document.createElement = function (...args) {
    // If this is not a script tag, bypass
    if (args[0].toLowerCase() !== "script")
      return createElementBackup.bind(document)(...args);

    const scriptElt = createElementBackup.bind(document)(...args);

    // Define getters / setters to ensure that the script type is properly set
    try {
      Object.defineProperties(scriptElt, {
        src: {
          ...originalDescriptors.src,
          set(value) {
            if (shouldBlockScript(scriptElt)) {
              originalDescriptors.type.set.call(this, TYPE_ATTRIBUTE);
            }
            originalDescriptors.src.set.call(this, value);
          },
        },
        type: {
          ...originalDescriptors.type,
          get() {
            const typeValue = originalDescriptors.type.get.call(this);
            if (typeValue === TYPE_ATTRIBUTE || shouldBlockScript(this)) {
              // Prevent script execution.
              return null;
            }
            return typeValue;
          },
          set(value) {
            const typeValue = shouldBlockScript(scriptElt)
              ? TYPE_ATTRIBUTE
              : value;
            originalDescriptors.type.set.call(this, typeValue);
          },
        },
      });

      // Monkey patch the setAttribute function so that the setter is called instead
      scriptElt.setAttribute = function (name, value) {
        if (name === "type" || name === "src") scriptElt[name] = value;
        else
          HTMLScriptElement.prototype.setAttribute.call(scriptElt, name, value);
      };
    } catch (error) {
      // eslint-disable-next-line
      console.warn(
        "Yett: unable to prevent script execution for script src ",
        scriptElt.src,
        ".\n",
        'A likely cause would be because you are using a third-party browser extension that monkey patches the "document.createElement" function.'
      );
    }
    return scriptElt;
  };
}
