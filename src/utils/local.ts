import { isString, isObject } from "./utils";
import { Cookie } from "./cookie";

const localStorage = window.localStorage || Cookie || {};

export class Local {
  static set(key: string, data: any): void {
    if (isObject(data)) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  static get(key: string): any {
    let value = localStorage.getItem(key) || null;
    if (isString(value)) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        console.error(e);
      }
    }
    return value;
  }
  static getString(key: string): string {
    const value = localStorage.getItem(key) || "";
    return value;
  }
  static remove(key: string) {
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(e);
      }
    }
  }
  static clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
}
