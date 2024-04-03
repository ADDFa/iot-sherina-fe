import { Button } from "react-bootstrap"
import { Icon } from "./Icon"
import { useNavigate } from "react-router-dom"
import Auth from "../Function/Auth"

const SignOutButton = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        Auth.clear()
        navigate("/")
    }

    return (
        <Button onClick={handleSignOut} variant="warning">
            <Icon icon="box-arrow-left" />
        </Button>
    )
}

export default SignOutButton
