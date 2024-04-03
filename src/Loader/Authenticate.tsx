import { redirect } from "react-router-dom"
import Auth from "../Function/Auth"

class Authenticate {
    static isSignIn() {
        if (!Auth.exists) return null

        if (Auth.is("admin")) {
            return redirect(`/${Auth.role}/dashboard`)
        } else {
            return redirect(`/driver`)
        }
    }

    static notSignIn() {
        return Auth.exists ? null : redirect("/")
    }
}

export default Authenticate
