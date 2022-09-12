import { useState } from 'react'

//init->初期値 key->保存のkey
export const useStateWithStorage = (
  init: string,
  key: string,
): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }
  return [value, setValueWithStorage]
}
