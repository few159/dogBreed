export class Storage {
    constructor() { }
  
    setLocalStorage<T>(chave: string, obj: T) {
      if (typeof window !== "undefined") {
        const convertObjArray = JSON.stringify(obj)
        localStorage.setItem(chave, convertObjArray)
      }
    }
  
    getLocalStorage<T>(chave: string): T | null {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(chave)
        if (item == null) {
          return null
        }
        const convertItem = JSON.parse(item)
        return convertItem as T
      }
    }
    deleteLocalStorage(chave: string) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(chave)
      }
    }
  
    setSessionStorage(chave: string, obj) {
      const convertObjArray = JSON.stringify(obj)
      sessionStorage.setItem(chave, convertObjArray)
    }
    getSessionStorage(chave: string) {
      const item = sessionStorage.getItem(chave)
      const convertItem = JSON.parse(item)
      return convertItem
    }
    deleteSessionStorage(chave: string) {
      sessionStorage.removeItem(chave)
    }
  }