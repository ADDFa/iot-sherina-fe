import Auth from "./Auth"
import {} from "./Firebase"
import HandleError from "./HandleError"

class Api {
    private static base_url = "https://iot-sherina.000webhostapp.com"

    static get baseUrl() {
        return this.base_url
    }

    static async request(
        path?: string,
        init?: RequestInit
    ): Promise<null | any> {
        try {
            if (Auth.exists && Auth.isExp) {
                const body = new FormData()
                body.append("refresh_token", Auth.refresh)
                const req = await fetch(`${this.baseUrl}/api/refresh`, {
                    body,
                    method: "POST"
                })
                if (req.ok) {
                    Auth.auth = await req.json()
                } else {
                    Auth.clear()
                    location.href = "/"

                    return null
                }
            }

            init = { ...init }

            if (Auth.token) {
                init = {
                    ...init,
                    headers: {
                        ...init.headers,
                        Authorization: `Bearer ${Auth.token}`
                    }
                }
            }

            if (init.body) {
                init = {
                    method: "POST",
                    ...init
                }
            }

            const response = await fetch(`${this.base_url}/api/${path}`, init)
            const result = await response.json()

            if (response.ok) {
                return result
            } else {
                console.table(result)
                new HandleError(result)
                return null
            }
        } catch (e: any) {
            console.info(e)

            return null
        }
    }
}

export default Api
