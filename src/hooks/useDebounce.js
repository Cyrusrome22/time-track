import React from "react"

// This hook is used to make a delay for a function all
const useDebounce = (value, timeout = 800) => {
  const [state, setState] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout)
    return () => clearTimeout(handler)
  }, [value, timeout])

  return state
}

export default useDebounce
