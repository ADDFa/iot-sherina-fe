class Auth {
    private static name = "authenticate"

    static get exists(): boolean {
        return !!localStorage.getItem(this.name)
    }

    static get auth(): Record<string, any> {
        const data = localStorage.getItem(this.name)
        return data ? JSON.parse(data) : {}
    }

    static set auth(data: Record<string, any>) {
        localStorage.setItem(this.name, JSON.stringify(data))
    }

    static get role() {
        return this.auth.payload?.role
    }

    static is(role: "admin" | "driver") {
        return this.role === role
    }

    static get token(): string {
        return this.auth.access_token || ""
    }

    static get refresh(): string {
        return this.auth.refresh_token || ""
    }

    static get session() {
        if (this.is("driver")) {
            return this.auth.payload?.driver?.session
        }
    }

    static clear() {
        localStorage.removeItem(this.name)
    }

    static get isExp(): boolean {
        const tokenAccess = this.auth.access_token
        if (!tokenAccess) return true

        let payload: any = atob(tokenAccess.split(".")[1])
        payload = JSON.parse(payload)

        const exp = payload.exp
        const now = Math.ceil(new Date().getTime() / 1000) + 10
        return now > exp
    }
}

export default Auth
