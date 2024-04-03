import {
    UseHandleSubmit,
    Handler,
    HandleSubmit
} from "../@types/Hooks/UseHandleSubmit"

const useHandleSumbit: UseHandleSubmit = (handler?: Handler) => {
    const handleSubmit: HandleSubmit = (e) => {
        e.preventDefault()
        if (handler) handler(e)
    }

    return handleSubmit
}

export default useHandleSumbit
