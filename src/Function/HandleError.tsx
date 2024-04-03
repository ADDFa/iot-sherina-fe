import Alert from "./Alert"
import { SweetAlertIcon } from "sweetalert2"

class HandleError {
    private response = new Response()

    constructor(error: any, response?: Response) {
        if (response) this.response = response

        if (error instanceof Object) {
            if ("message" in error) this.handleMessage(error.message)
            if ("errors" in error) this.handleErrors(error.errors)
        }
    }

    private handleMessage(title: string) {
        const status = this.response.status
        let icon: SweetAlertIcon = "warning"

        if (status >= 500) icon = "error"

        Alert.popup({ icon, title })
    }

    private handleErrors(errors: Record<string, string[]>) {
        const setErrorElement = (
            errorText: string,
            name: string,
            setTo: HTMLElement
        ) => {
            const elInv = document.createElement("p")
            elInv.appendChild(document.createTextNode(errorText))
            elInv.classList.add("invalid-feedback", "m-0", "p-0")
            elInv.dataset.name = name

            setTo.appendChild(elInv)
            return elInv
        }

        const refreshError = (errorText: string, name: string) => {
            const errEl: HTMLParagraphElement | null = document.querySelector(
                `.invalid-feedback[data-name="${name}"]`
            )
            if (!errEl) return

            errEl.textContent = errorText
        }

        for (const name in errors) {
            const elsError = document.querySelectorAll(`[name="${name}"]`)
            elsError.forEach((elError) => {
                if (!(elError instanceof HTMLElement)) return
                const errorText = errors[name][0]

                if (elError.classList.contains("is-invalid")) {
                    refreshError(errorText, name)
                    return
                }

                elError.classList.add("is-invalid")
                if (elError.parentElement) {
                    const invEl = setErrorElement(
                        errorText,
                        name,
                        elError.parentElement
                    )

                    const onInput = () => {
                        elError.classList.remove("is-invalid")
                        invEl.remove()
                        elError.removeEventListener("input", onInput)
                    }
                    elError.addEventListener("input", onInput)
                }
            })
        }
    }
}

export default HandleError
