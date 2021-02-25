/// <reference path='../types/index.d.ts' />

function findScript(src: string): HTMLScriptElement | null {
  return document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
}

function injectScript(src: string): HTMLScriptElement {
  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Square.js requires a <body> or <head> element.');
  }

  const script = document.createElement('script');
  script.src = src;

  headOrBody.appendChild(script);

  return script;
}

let loadPromise: Promise<Square | null> | null = null;

export function loadSquare(src: string): Promise<Square | null> {
  if (loadPromise !== null) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Square) {
      resolve(window.Square);
      return;
    }

    try {
      let script = findScript(src);

      if (!script) {
        script = injectScript(src);
      }

      script.addEventListener('load', () => {
        if (window.Square) {
          resolve(window.Square);
        } else {
          reject(new Error('Square.js failed to load properly.'));
        }
      });

      script.addEventListener('error', () => {
        reject(new Error('Error occurred while loading Square.js'));
      });
    } catch (err) {
      reject(err);
    }
  });

  return loadPromise;
}
