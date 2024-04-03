import { FC, useState } from "react"
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Modal
} from "react-bootstrap"
import useHandleSumbit from "../../../../Hooks/useHandleSubmit"
import SpinnerButton from "../../../../Components/SpinnerButton"
import Api from "../../../../Function/Api"

const AddDriver: FC<Driver.AddDriverI> = ({ drivers, setDrivers }) => {
    const [hidden, setHidden] = useState(true)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = useHandleSumbit(async (e) => {
        setHidden(false)

        const body = new FormData(e.currentTarget)
        const res = await Api.request("driver", { body })

        setHidden(true)
        handleClose()
        if (!res) return

        const updatedDrivers = drivers ? [...drivers, res] : [res]
        setDrivers(updatedDrivers)
    })

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Tambah Driver
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Driver</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3" controlId="name">
                            <FormLabel>Nama</FormLabel>
                            <FormControl name="name" autoComplete="off" />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="username">
                            <FormLabel>Username</FormLabel>
                            <FormControl
                                type="text"
                                autoComplete="off"
                                name="username"
                            />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="password" />
                        </FormGroup>
                        <SpinnerButton
                            className="w-100 rounded-5 my-4"
                            hidden={hidden}
                        >
                            Simpan
                        </SpinnerButton>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddDriver
