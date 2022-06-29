import { useCallback } from "react"

export const useMessgae = () => {
    return useCallback(text => {
        if(window.M && text) {
            window.M.toast({html : text})
        }
    }, [])
}