export function setStorage ({key, value}) {
  return window.localStorage.setItem(key, value);
}

export function getStorage (key) {
  return window.localStorage.getItem(key);
}

export function isStorage (key) {
  return window.localStorage.getItem(key) ? true : false;
}

export function removeStorage (key) {
  return window.localStorage.removeItem(key);
}

export function clearStorage () {
  return window.localStorage.clear();
}