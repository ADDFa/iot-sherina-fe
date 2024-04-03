import { Button } from "react-bootstrap"
import { Icon } from "../../../../Components/Icon"
import { FC } from "react"
import Alert from "../../../../Function/Alert"
import Api from "../../../../Function/Api"

const DeleteDriver: FC<Driver.DeleteDriverI> = ({
    id,
    drivers,
    setDrivers
}) => {
    const handleDelete = () => {
        Alert.confirm().then((res) => {
            if (!res.isConfirmed) return

            const body = new FormData()
            body.append("_method", "DELETE")
            Api.request(`driver/${id}`, { body })

            const updatedDrivers = drivers?.filter((driver) => driver.id != id)
            setDrivers(updatedDrivers)
        })
    }

    return (
        <Button variant="danger" type="button" onClick={handleDelete}>
            <Icon icon="trash" />
        </Button>
    )
}

export default DeleteDriver
