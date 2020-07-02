export function localSet (val, key = 'userInfo') {
  window.localStorage.setItem(key, JSON.stringify(val))
}

export function localGet (key = 'userInfo') {
  return JSON.parse(window.localStorage.getItem(key))
}

export function localDel (key = 'userInfo') {
  window.localStorage.removeItem(key)
}
