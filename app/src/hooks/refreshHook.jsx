import { useState } from "react"

function useRefresh() {
    const [state, setState] = useState(false)
    return [state,() => setState((prev) => !prev) ]
}

export default useRefresh