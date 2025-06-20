declare module 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs' {
    export interface PyodideInterface {
      runPython(code: string): any;
      globals: any;
      version: string;
      loadPackage: (names: string | string[]) => Promise<void>;
    }
  
    export function loadPyodide(config: {
      indexURL: string;
    }): Promise<PyodideInterface>;
  }
  