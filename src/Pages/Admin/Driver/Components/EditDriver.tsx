import { FC, useEffect, useState } from "react"
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Modal
} from "react-bootstrap"
import useHandleSumbit from "../../../../Hooks/useHandleSubmit"
import SpinnerButton from "../../../../Components/SpinnerButton"
import { Icon } from "../../../../Components/Icon"
import Api from "../../../../Function/Api"

const EditDriver: FC<Driver.EditDriver> = ({ id, drivers, setDrivers }) => {
    const [hidden, setHidden] = useState(true)
    const [show, setShow] = useState(false)
    const [driver, setDriver] = useState<Driver.Driver>({})

    useEffect(() => {
        if (drivers) {
            const updatedDriver = drivers.find((driver) => driver.id == id)
            if (updatedDriver) setDriver(updatedDriver)
        }
    }, [])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = useHandleSumbit(async (e) => {
        setHidden(false)

        const body = new FormData(e.currentTarget)
        body.append("_method", "PUT")

        const res = await Api.request(`driver/${id}`, { body })
        setHidden(true)
        if (!res) return

        if (drivers) {
            const updatedDrivers = drivers.map((driver) => {
                return driver.id == id ? res : driver
            })
            setDrivers(updatedDrivers)
        }
        setShow(false)
    })

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                <Icon icon="pen" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data Driver</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3" controlId="name">
                            <FormLabel>Nama</FormLabel>
                            <FormControl
                                name="name"
                                autoComplete="off"
                                defaultValue={driver?.name}
                            />
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

export default EditDriver
