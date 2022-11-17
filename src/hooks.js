import { useState } from "react";
import store from "store"

export function useLocalStorage(key, defaultValue) {
    const [storedVal, setState] = useState(()=>{
        return store.get(key) ?? defaultValue
    })

    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedVal) : value
        setState(valueToStore)
        store.set(key, valueToStore)
    }

    return [storedVal, setValue]
}