import React, { useState, useEffect } from "react"

const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<T>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])
}

export default useDebounce

// import { useState, useEffect } from "react"

// // Custom useDebounce hook
// const useDebounce = <T>(
//   value: T,
//   delay: number,
//   callback: (value: T) => void,
// ) => {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//       callback(value) // Call the callback function with the debounced value
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay, callback])

//   return debouncedValue
// }

// export default useDebounce
