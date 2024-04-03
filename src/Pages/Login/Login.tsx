import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import useHandleSumbit from "../../Hooks/useHandleSubmit"
import { useState } from "react"
import Api from "../../Function/Api"
import Auth from "../../Function/Auth"
import { useNavigate } from "react-router-dom"
import { FormControl, FormGroup, FormLabel } from "react-bootstrap"
import SpinnerButton from "../../Components/SpinnerButton"

const Login = () => {
    const [hidden, setHidden] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = useHandleSumbit(async (e) => {
        setHidden(false)

        const body: BodyInit = new FormData(e.currentTarget)
        const res = await Api.request("sign-in", {
            body
        })

        setHidden(true)
        if (!res) return

        Auth.auth = res
        if (Auth.is("admin")) navigate(`/admin/dashboard`)
        if (Auth.is("driver")) navigate(`/driver`)
    })

    return (
        <Container>
            <Row className="vh-100 align-items-center justify-content-center">
                <Col className="col-lg-5 col-md-10">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Header>
                                <h1 className="text-center fs-5 fw-bold">
                                    MONITORING PENGEMUDI
                                </h1>
                            </Card.Header>

                            <Card.Body>
                                <h2 className="text-center fs-4 fw-bold mb-4">
                                    LOGIN
                                </h2>

                                <FormGroup
                                    className="mb-3"
                                    controlId="username"
                                >
                                    <FormLabel>Username</FormLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="off"
                                        name="username"
                                    />
                                </FormGroup>
                                <FormGroup
                                    className="mb-3"
                                    controlId="password"
                                >
                                    <FormLabel>Password</FormLabel>
                                    <FormControl
                                        type="password"
                                        name="password"
                                    />
                                </FormGroup>
                                <div className="mt-5 mb-3">
                                    <SpinnerButton
                                        hidden={hidden}
                                        className="w-100 rounded-5"
                                    >
                                        Login
                                    </SpinnerButton>
                                </div>
                            </Card.Body>
                        </Card>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
